import { DataTable, type DataTableValue } from "primereact/datatable";
import { Column } from "primereact/column";
import { useContext, useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";
import { columns } from "../utils/columns";

const ArtworkTable = () => {
    const value = useContext(DataContext)
    const [selectedRows, setSelectedRows] = useState<DataTableValue[] | null>(null);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [pageData, setPageData] = useState<{ first: number, rows: number }>({
        first: 0,
        rows: 0
    })

    function loadData(): void {
        setTotalRecords(value?.data?.[0]?.total)
    }

    console.log(selectedRows);
    useEffect(() => {
        setSelectedRows(prevState => [...(prevState || []), ...(value?.artworks?.filter((art) => art.selected === true) || [])])
    }, [value?.updateRows])

    useEffect(() => {
        loadData()
    }, [value, pageData, value?.artworks])

    const navigate = useNavigate()
    if (value?.error) {
        return (<h1>An Error Occured</h1>)
    }
    return (
        <>
            <DataTable
                value={value?.artworks}
                lazy
                paginator
                rows={pageData.rows || 12}
                first={pageData.first}
                totalRecords={totalRecords}
                onPage={(e) => {
                    setPageData({ first: e.first, rows: e.rows });
                    navigate({
                        search: `?${createSearchParams({ page: ((e.page ?? 0) + 1).toString() })}`
                    });
                }}
                selection={selectedRows as DataTableValue[]}
                onSelectionChange={(e) => {
                    setSelectedRows(e.value)
                }}
                dataKey="title"
                showGridlines
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} artworks"
                loading={value?.loading}

            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} ></Column>
                {columns.map((col) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
        </>
    );
};

export default ArtworkTable;

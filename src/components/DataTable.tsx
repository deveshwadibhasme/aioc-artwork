import { DataTable, type DataTableValue } from "primereact/datatable";
import { Column } from "primereact/column";
import { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";

const ArtworkTable = () => {
    const value = useContext(DataContext)
    const [selectedRows, setSelectedRows] = useState<DataTableValue[] | null>(null);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [pageData, setPageData] = useState<any>({
        first: 0,
        rows: 0
    })

    const columns: any[] = [
        {
            field: "title",
            header: "Title"
        },
        {
            field: "place_of_origin",
            header: "Place of Origin"
        },
        {
            field: "artist_display",
            header: "Artist"
        },
        {
            field: "inscriptions",
            header: "Inscriptions"
        },
        {
            field: "date_start",
            header: "Start Year"
        },
        {
            field: "date_end",
            header: "End Year"
        },
    ]

    function loadData(): void {
        setTotalRecords(value?.data?.[0]?.total)
    }

    useEffect(() => {
        loadData()
    }, [value])


    return (
        // <div>
        <DataTable
            value={value?.artworks}
            lazy
            paginator
            rows={pageData.rows || 12}
            first={pageData.first}
            totalRecords={totalRecords}
            onPage={(e) => {
                setPageData({ first: e.first, rows: e.rows })
                location.search = `?page=${(e.page ?? 0) + 1}`;

            }}
            selection={selectedRows as DataTableValue[]}
            onSelectionChange={(e) => setSelectedRows(e.value)}
            dataKey="title"
            showGridlines
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
            {columns.map((col) => (
                <Column key={col.field} field={col.field} header={col.header} />
            ))}
        </DataTable>
        // </div>
    );
};

export default ArtworkTable;

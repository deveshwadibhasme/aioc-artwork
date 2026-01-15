import { useContext, useState, type SyntheticEvent } from 'react';
import DataContext from '../context/DataContext';

const Header = () => {
    const value = useContext(DataContext)
    const [selectionNumber, setSelectionNumber] = useState<number | undefined>()

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        if (selectionNumber && selectionNumber > 0) {
            value?.setUpdateRows(true)
            if (value?.artworks) {
                for (let i = 0; i < selectionNumber && i < value.artworks.length; i++) { // selectionNumber is guaranteed to be a number here
                    value.artworks[i].selected = true;
                }
            }
        }
    }

    return (
        <div className='wrapper'>
            <h1 className='h1'>Art Institute of Chicago</h1>


            <div className='rows-select'>
                <span>Select Rows</span>
                <i style={{ marginLeft: '5px' }} className="fas fa-angle-right"></i>
                <form className='form' onSubmit={(e) => handleSubmit(e)}>
                    <input type="number" onChange={(e) => setSelectionNumber(e.target.valueAsNumber)} />
                    <button type="submit">Select</button>
                </form>
            </div>

        </div >
    )
}

export default Header
import Entry from './components/entry.jsx'
import Header from './components/header.jsx'
import Data from './data.js'

export default function App()
{
    const Entry_Data = Data.map(entry => {
        return <Entry
            key={entry.id}
            entry={entry}
        />
    })
    return (
        <>
            <Header/>
            {Entry_Data}
        </>
    )
}
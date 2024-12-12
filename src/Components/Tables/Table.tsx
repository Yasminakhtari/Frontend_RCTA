// import React, { useState, useEffect, useRef } from 'react'
// import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy, usePagination } from 'react-table'
// import { ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
// import { classNames } from '../../shared/Utils.jsx'
// import { SortIcon, SortUpIcon, SortDownIcon } from '../../shared/Icons.jsx'
// import { Button, PageButton } from '../../shared/Button.jsx';
// import "flatpickr/dist/themes/material_green.css";

// import Flatpickr from "react-flatpickr";

// // Define a default UI for filtering
// function GlobalFilter({
//     preGlobalFilteredRows,
//     globalFilter,
//     setGlobalFilter,
// }:any) {
//     const count = preGlobalFilteredRows.length;
//     const [value, setValue] = useState(globalFilter || '');

//     // Use a ref to store the debounce timeout ID
//     const debounceTimeout = React.useRef(null);

//     useEffect(() => {
//         // Clear the previous timeout if it exists
//         if (debounceTimeout.current) {
//             clearTimeout(debounceTimeout.current);
//         }

//         // Set a new timeout for debouncing
//         debounceTimeout?.current = setTimeout(() => {
//             setGlobalFilter(value || undefined);
//         }, 200);

//         // Cleanup timeout on component unmount
//         return () => {
//             if (debounceTimeout.current) {
//                 clearTimeout(debounceTimeout.current);
//             }
//         };
//     }, [value, setGlobalFilter]);

//     return (
//         <label className="flex gap-x-2 items-baseline">
//             <span className="text-gray-700">Search: </span>
//             <input
//                 type="text"
//                 className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 value={value}
//                 onChange={e => setValue(e.target.value)}
//                 placeholder={"Search in records..."}
//             // placeholder={`${count} records...`}
//             />
//         </label>
//     );
// }

// // This is a custom filter UI for selecting
// // a unique option from a list
// export function SelectColumnFilter({
//     column: { filterValue, setFilter, preFilteredRows, id, render },
// }:any) {
//     // Calculate the options for filtering
//     // using the preFilteredRows
//     const options = React.useMemo(() => {
//         const options = new Set()
//         preFilteredRows.forEach(row => {
//             options.add(row.values[id])
//         })
//         return [...options.values()]
//     }, [id, preFilteredRows])

//     const handleClear = () => {
//         setFilter(undefined);
//     };

//     // Render a multi-select box
//     return (
//         <div>
//         <label className="flex gap-x-2 items-baseline">
//             <span className="text-gray-700">{render("Header")}: </span>
//             <select
//                 className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 name={id}
//                 id={id}
//                 value={filterValue}
//                 onChange={e => {
//                     setFilter(e.target.value || undefined)
//                 }}
//             >
//                 <option value="">All</option>
//                 {options.map((option, i) => (
//                     <option key={i} value={option}>
//                         {option}
//                     </option>
//                 ))}
//             </select>
//         </label>
//         <button
//         hidden
//         onClick={handleClear}
//         className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//     >
//         Clear Filter
//     </button>
//     </div>
//     )
// }

// export function StatusPill({ value  }:any) {
//     const status = value ? value.toLowerCase() : "unknown";

//     return (
//         <span
//             className={
//                 classNames(
//                     "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
//                     status.startsWith("active") ? "bg-green-100 text-green-800" : null,
//                     status.startsWith("inactive") ? "bg-yellow-100 text-yellow-800" : null,
//                     status.startsWith("offline") ? "bg-red-100 text-red-800" : null,
//                 )
//             }
//         >
//             {status}
//         </span>
//     );
// };

// export function AvatarCell({ value, column, row }:any) {
//     return (
//         <div className="flex items-center">
//             <div className="flex-shrink-0 h-10 w-10">
//                 <img className="h-10 w-10 rounded-full" src={row.original[column.imgAccessor]} alt="" />
//             </div>
//             <div className="ml-4">
//                 <div className="text-sm font-medium text-gray-900">{value}</div>
//                 <div className="text-sm text-gray-500">{row.original[column.emailAccessor]}</div>
//             </div>
//         </div>
//     )
// }


// export const DateRangeColumnFilter = ({
//     column: { filterValue = [], setFilter },
// }:any) => {
//     const [selectedDates, setSelectedDates] = useState(filterValue || []);
//     const handleClear = () => {
//         setSelectedDates([]); // Clear selected dates state
//         setFilter([]); // Clear the filter
//         if (document.querySelector('.flatpickr-input')?._flatpickr) {
//             document.querySelector('.flatpickr-input')?._flatpickr.clear(); // Clear Flatpickr input value
//         }
//     }; 
//     const handleDateChange = (dates:any) => {
//         setSelectedDates(dates); // Update selected dates state
//         if (dates.length === 2) {
//             setFilter(dates); // Set filter only when both dates are selected
//         } else {
//             setFilter([]); // If the user clears the date, clear the filter
//         }
//     };
//     return (
//         <label className="flex gap-x-2 items-baseline">
//             <span className="text-gray-700">Date Range: </span>
//             <Flatpickr
//                 className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 options={{
//                     mode: 'range',
//                     dateFormat: 'Y-m-d',
//                 }}
//                 value={selectedDates}
//                 onChange={handleDateChange} // Update selected dates and filter
//                 placeholder="Select Date Range"
//             />
//             <button
//                 onClick={handleClear}
//                 className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//             >
//                 Clear Date Filter
//             </button>
//         </label>
//     );
// };

// // Function to filter rows between date range
// export function filterBetweenDates(rows:any, id:any, filterValue:any) {
//     const [start, end] = filterValue;

//     if (!start || !end) return rows;

//     const startDate = new Date(start);
//     const endDate = new Date(end);

//     return rows.filter(row => {
//         const rowDate = new Date(row.values[id]);
//         return rowDate >= startDate && rowDate <= endDate;
//     });
// }

// function Table({ columns, data }:any) {
//     // Use the state and functions returned from useTable to build your UI
//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         prepareRow,
//         page, // Instead of using 'rows', we'll use page,
//         // which has only the rows for the active page

//         // The rest of these things are super handy, too ;)
//         canPreviousPage,
//         canNextPage,
//         pageOptions,
//         pageCount,
//         gotoPage,
//         nextPage,
//         previousPage,
//         setPageSize,

//         state,
//         preGlobalFilteredRows,
//         setGlobalFilter,
//         setFilter,
//     } = useTable({
//         columns,
//         data,
//     },
//         useFilters, // useFilters!
//         useGlobalFilter,
//         useSortBy,
//         usePagination,  // new
//     )
//     const count = preGlobalFilteredRows.length;

//     // Render the UI for your table
//     return (
//         <>
//             <div className="flex flex-wrap gap-x-2 justify-between">
//                 {/* <div className="sm:flex sm:gap-x-2 "> */}
//                 <GlobalFilter
//                     preGlobalFilteredRows={preGlobalFilteredRows}
//                     globalFilter={state.globalFilter}
//                     setGlobalFilter={setGlobalFilter}
//                 />
//                 {headerGroups.map((headerGroup) =>
//                     headerGroup.headers.map((column) =>
//                         column.Filter ? (
//                             <div className="mt-0 sm:mt-0" key={column.id}>
//                                 {column.render("Filter")}
//                             </div>
//                         ) : null
//                     )
//                 )}
//             </div>
//             {/* table */}
//             <div className="mt-4 flex flex-col">
//                 <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
//                     <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//                         <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//                             <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
//                                 <thead className="bg-gray-50">
//                                     {headerGroups.map(headerGroup => (
//                                         <tr {...headerGroup.getHeaderGroupProps()}>
//                                             {headerGroup.headers.map(column => (
//                                                 // Add the sorting props to control sorting. For this example
//                                                 // we can add them into the header props
//                                                 <th
//                                                     scope="col"
//                                                     className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                                     {...column.getHeaderProps(column.getSortByToggleProps())}
//                                                 >
//                                                     <div className="flex items-center justify-between">
//                                                         {column.render('Header')}
//                                                         {/* Add a sort direction indicator */}
//                                                         <span>
//                                                             {column.isSorted
//                                                                 ? column.isSortedDesc
//                                                                     ? <SortDownIcon className="w-4 h-4 text-gray-400" />
//                                                                     : <SortUpIcon className="w-4 h-4 text-gray-400" />
//                                                                 : (
//                                                                     <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
//                                                                 )}
//                                                         </span>
//                                                     </div>
//                                                 </th>
//                                             ))}
//                                         </tr>
//                                     ))}
//                                 </thead>
//                                 <tbody
//                                     {...getTableBodyProps()}
//                                     className="bg-white divide-y divide-gray-200"
//                                 >
//                                     {page.map((row, i) => {  // new
//                                         prepareRow(row)
//                                         return (
//                                             <tr {...row.getRowProps()}>
//                                                 {row.cells.map(cell => {
//                                                     return (
//                                                         <td
//                                                             {...cell.getCellProps()}
//                                                             className="px-6 py-4 whitespace-nowrap"
//                                                             role="cell"
//                                                         >
//                                                             {cell.column.Cell.name === "defaultRenderer"
//                                                                 ? <div className="text-sm text-gray-500">{cell.render('Cell')}</div>
//                                                                 : cell.render('Cell')
//                                                             }
//                                                         </td>
//                                                     )
//                                                 })}
//                                             </tr>
//                                         )
//                                     })}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* Pagination */}
//             <div className="py-3 flex items-center justify-between">
//                 <div className="flex-1 flex justify-between sm:hidden">
//                     <Button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</Button>
//                     <Button onClick={() => nextPage()} disabled={!canNextPage}>Next</Button>
//                 </div>
//                 <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                     <div className="flex gap-x-2 items-baseline">
//                         <span className="text-sm text-gray-700">
//                             Page <span className="font-medium">{state.pageIndex + 1}</span> of <span className="font-medium">{pageOptions.length}</span>
//                         </span>
//                         <label>
//                             <span className="sr-only">Items Per Page</span>
//                             <select
//                                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                                 value={state.pageSize}
//                                 onChange={e => {
//                                     setPageSize(Number(e.target.value))
//                                 }}
//                             >
//                                 {[10, 20, 100].map(pageSize => (
//                                     <option key={pageSize} value={pageSize}>
//                                         Show {pageSize}
//                                     </option>
//                                 ))}
//                             </select>
//                         </label>
//                     </div>
//                     <div><h5>{`${count} records`}</h5></div>
//                     <div>
//                         <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                             <PageButton
//                                 className="rounded-l-md"
//                                 onClick={() => gotoPage(0)}
//                                 disabled={!canPreviousPage}
//                             >
//                                 <span className="sr-only">First</span>
//                                 <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                             </PageButton>
//                             <PageButton
//                                 onClick={() => previousPage()}
//                                 disabled={!canPreviousPage}
//                             >
//                                 <span className="sr-only">Previous</span>
//                                 <ChevronLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                             </PageButton>
//                             <PageButton
//                                 onClick={() => nextPage()}
//                                 disabled={!canNextPage
//                                 }>
//                                 <span className="sr-only">Next</span>
//                                 <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                             </PageButton>
//                             <PageButton
//                                 className="rounded-r-md"
//                                 onClick={() => gotoPage(pageCount - 1)}
//                                 disabled={!canNextPage}
//                             >
//                                 <span className="sr-only">Last</span>
//                                 <ChevronDoubleRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                             </PageButton>
//                         </nav>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Table;
import React from 'react'

const Table = () => {
  return (
    <div>Table</div>
  )
}

export default Table
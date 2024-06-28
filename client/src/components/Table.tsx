import React from 'react';

interface Column {
  key: string;
  name: string;
  render?: (value: any) => JSX.Element;
}

interface TableProps {
  data: any[];
  columns: Column[];
}

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
  return (
    <section className='bg-white dark:bg-dark py-20 lg:py-[120px] w-full'>
      <div className='container'>
        <div className='flex flex-wrap -mx-4'>
          <div className='w-full'>
            <div className='max-w-full overflow-x-auto'>
              <table className='w-full table-auto'>
                <thead className='text-center bg-primary'>
                  <tr>
                    {columns.map((column) => (
                      <th key={column.key} className={TdStyle.ThStyle}>
                        {column.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                      {columns.map((column) => (
                        <td key={column.key} className={rowIndex % 2 === 0 ? TdStyle.TdStyle : TdStyle.TdStyle2}>
                          {column.render
                            ? column.render(row[column.key])
                            : row[column.key]}
                        </td>
                      ))}
                      <td className={rowIndex % 2 === 0 ? TdStyle.TdStyle : TdStyle.TdStyle2}>
                        <button className={TdStyle.TdButton}>
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Table;

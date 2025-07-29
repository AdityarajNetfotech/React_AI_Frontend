import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className='mt-4 flex flex-wrap items-center gap-4 justify-center'>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                className="flex items-center justify-center shadow-md transition-all duration-300 text-lg  opacity-60"

                disabled={currentPage == 1}
            >
                ◀
            </button>
            <div className='text-sm font-bold text-blue-600 px-4'>
                {currentPage}
            </div>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                className="flex items-center justify-center shadow-md transition-all duration-300 text-lg opacity-60"
                disabled={currentPage >= totalPages}
            >
                <span>▶</span>
            </button>

        </div>
    )
}

export default Pagination

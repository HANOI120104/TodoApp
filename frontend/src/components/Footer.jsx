import React from 'react'


const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
    return (
        <>
            {completedTasksCount + activeTasksCount > 0 &&
                (
                    <div className='text-center'>
                        <p className='text-sm text-muted-foreground'>
                            {
                                completedTasksCount > 0 && (
                                    <>
                                        Tuyet voi! Ban da hoan thanh {completedTasksCount} cong viec.
                                        {
                                            activeTasksCount > 0 && `, con ${activeTasksCount} cong viec dang lam.`
                                        }
                                    </>
                                )
                            }
                            {completedTasksCount === 0 && activeTasksCount > 0 && (
                                <>
                                    Hay bat dau lam {activeTasksCount} cong viec nao!
                                </>
                            )}
                        </p>
                    </div>

                )}

        </>
    )
}

export default Footer
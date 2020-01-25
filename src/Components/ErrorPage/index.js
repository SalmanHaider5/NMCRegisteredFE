import React from 'react'
import {Result, Button} from 'antd'

const Errorpage = (props) => {
    return (
        <div>
            <div>   
                <section>        
                    <div>
                        <div style={{marginTop: '50px'}}>
                            <Result
                                status="error"
                                title="Submission Failed"
                                subTitle="Please check and modify the following information before resubmitting."
                                extra={[
                                <Button type='primary' key="buy">Go to Home Again</Button>,
                                ]}
                            >
                            </Result>
                        </div>
                    </div>
                </section>        
            </div>            
        </div>
    )
}

export default Errorpage;


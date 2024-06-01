import React, { useContext }  from 'react'
import style from './DisplayFeedback.module.css';
import { Link } from 'react-router-dom';
import { DisplayContext } from '../context/Display';
import { useQuery } from 'react-query';

export default function Feedback() {
    
    const displayContext = useContext(DisplayContext);

    if (!displayContext) {
        return <div className={style.error}>Context not available</div>; // Added error handling
    }
    
    let {displayFeedback}=displayContext;

    const getFeedback=async()=>{
        const result = await displayFeedback();
        return result;
    }
    const {data,isLoading}=useQuery("getFeedback",getFeedback);

    console.log("this feedback",data);
    

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    return (
        <div className={`container my-5 ${style.recnt}`} dir='rtl'>
            <div className="d-flex justify-content-between">
                <p className={`${style.p1}`}>الملاحظات</p>
                <Link to={"/ara/addFeedbackArabic"} className={`${style.btnAddFeedback}`}>أضافة الملاحظات</Link>
            </div>
            <div cclassName={`${style.cardContainer}`}>
                <div className="row">
                    {data && data.feedbacks ? data.feedbacks.map((state) =>
                        <div className="col-md-3 " key={state._id}>
                            <div className={`${style.card}`}>
                                <div className={`${style.cardHeader}`}>
                                    <h2>{state.userId.name}</h2>
                                </div>
                                <div className={`${style.cardBody}`}>
                                    <p>{state.statement}</p>
                                </div>
                            </div>
                        </div>
                    ) : <h1>فارغ</h1>}
                </div>
            </div>
        </div>
    )
}

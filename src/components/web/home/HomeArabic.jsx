import React, { useState,useContext,useEffect } from 'react';
import style from '../home/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import RecentEstateArabic from '../recentEstates/RecentEstateArabic';
import axios from 'axios';
import { useQuery } from 'react-query';
import DisplayHouseArabic from '../house/DisplayHouseArabic';
import DisplayLandArabic from '../land/DisplayLandArabic';
import ContactUsArabic from '../contact/ContactUsArabic';
import DisplayFeedbackArabic from '../displayFeedback/DisplayFeedbackArabic';
import { UserContext } from '../context/User';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [activeButton, setActiveButton] = useState("");
    let {isAdmin}=useContext(UserContext);
    const navigat=useNavigate();

    const isActive = (btn) => {
        setActiveButton(btn);
    }
    useEffect(() => {
        if (isAdmin) {
          try {
            console.log('user is admin :',isAdmin);
            navigat('/admin');
    
          } catch (error) {
            console.error('Error decoding the token:', error);
          }
        }
      }, [isAdmin]);
      if (isAdmin) {
        navigat('/admin');
      }

      const [location,setLocation] = useState('');
      const [typeState,setTypeState]=useState('');
      const [rentrORseller,setRentrORseller]=useState('');
      const navigate = useNavigate();
      const handleSearch = () => {
          navigate(`/ara/searchResultsArabic?typeState=${typeState}&cityName=${location}&SR=${rentrORseller}`);
      };
      
      const searchOnCity=(city)=>{
          navigate(`/ara/searchCityArabic?cityName=${city}`);
      }

    return (
        <>
            <div className='container' dir='rtl'>
                <div className={`${style.bacImg}`}>
                    <div className={`${style.p1}`}>
                        <p>طريقة سهلة للعثور على العقار المثالي</p>
                    </div>

                    <div className={`${style.p2}`}>
                        <p>نحن نقدم خدمة كاملة للبيع أو الشراء أو التأجير العقاري.</p>
                    </div>

                    <div className={`${style.rectangle}`}>

                        <div className="row">
                            <div className="col-md-4">
                                <div className={`${style.location}`}>
                                    <p>الموقع</p>

                                    <select className="form-select" aria-label="Default select example" value={location} onChange={(e)=>setLocation(e.target.value)}>
                                        <option value="">اختر مدينتك</option>
                                        <option value="Ramallah">رام الله</option>
                                        <option value="Tulkarm">طولكرم</option>
                                        <option value="Nablus">نابلس</option>
                                    </select>

                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className={`${style.property}`}>
                                    <p>نوع العقار</p>

                                    <select className="form-select" aria-label="Default select example" value={typeState} onChange={(e)=>setTypeState(e.target.value)}>
                                        <option value="">اختر نوع العقار</option>
                                        <option value="House">منزل</option>
                                        <option value="Apartment">شقة</option>
                                        <option value="Land">أرض</option>
                                        <option value="Store">مخزن</option>
                                        <option value="Chalet">شالية</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className={`${style.price}`}>
                                    <p>نطاق السعر</p>

                                    <select className="form-select" aria-label="Default select example" value={rentrORseller} onChange={(e)=>setRentrORseller(e.target.value)}>
                                        <option value="">اختر بيع أو إجار</option>
                                        <option value="Rent">إجار</option>
                                        <option value="Sale">بيع</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-1">
                                <div className={`${style.search1}`}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className={`${style.icon}`}  onClick={handleSearch} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`mb-5 ${style.knownCity}`}>
                    <div className={`${style.parg}`}>
                        <p>نحن متوفرون في العديد من المدن المعروفة</p>
                    </div>
                    <div className="row">
                        <div className={`col-md-3 ${style.imgHome}`}>
                            <img src='../../../../img/alquds.jpeg' className='img-fluid' onClick={() => searchOnCity("Jerusalem")} />
                            <p>القدس</p>
                        </div>

                        <div className={`col-md-3 ${style.imgHome}`}>
                            <img src='../../../../img/gaza.jpeg' className='img-fluid' onClick={() => searchOnCity("Gaza")}/>
                            <p>غزة</p>
                        </div>

                        <div className={`col-md-3 ${style.imgHome}`}>
                            <img src='../../../../img/nablus.jpeg' className='img-fluid' onClick={() => searchOnCity("Nablus")}/>
                            <p>نابلس</p>
                        </div>

                        <div className={`col-md-3 ${style.imgHome}`}>
                            <img src='../../../../img/haifa.jpeg' className='img-fluid w-100' onClick={() => searchOnCity("Haifa")}/>
                            <p>حيفا</p>
                        </div>
                    </div>
                </div>
            </div>

            <RecentEstateArabic/>

            <DisplayHouseArabic/>

            <DisplayLandArabic/>

            <DisplayFeedbackArabic/>

            <ContactUsArabic />
        </>
    )
}

import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { handleGetPost, handlePost } from './api';
import * as err_type from './api/errorLog'

function App() {
  const taskId = Math.floor(Math.random() * 1000)
  const [id, setId] = useState(taskId)
  const [name, setName] = useState("")
  const [province, setProvince] = useState("")
  const [detail, setDetail] = useState("")
  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(false)

  const newToday = moment(new Date()).format('DD/MM/YYYY, h:mm:ss a')
  const [time, setTime] = useState(newToday)

  const [dataList, setDataList] = useState([])

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    /* #region  basic call api */
    // const formEle = document.querySelector("form");
    // const formDatab = new FormData(formEle);
    // fetch(
    //   API_SCRIPT,
    //   {
    //     method: "POST",
    //     body: formDatab
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setLoading(true)
    //     console.log(data);
    //     window.location.reload()
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false)
    //   });
    /* #endregion */

    try {
      const formEle = document.querySelector("form");
      const formDatab = new FormData(formEle);
      if (name && province && detail) {
        handlePost(formDatab).then(() => {
          setName("")
          setProvince("")
          setDetail("")
          setLoading(false);
          window.location.reload()
        })
      } else {
        console.log(err_type.errLog[404]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(err_type.errLog[408]);
    }
  }

  const handleLogAPI = async () => {
    handleGetPost().then((response) => {
      setDataList(response.data)
      console.log('res', response.data)
    })
  }

  useEffect(() => {
    handleLogAPI()
  }, [])
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      {
        loading
          ? <p>Loading...</p>
          : <div className="container-form">
            <form className='form_group' onSubmit={handleSubmitForm}>
              <input type="text" className="form_group-input-hidden" name="id" value={id} onChange={(e) => setId(e.target.value)} readOnly />
              <input type="text" className="form_group-input" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
              <input type="text" className="form_group-input" name='province' value={province} onChange={(e) => setProvince(e.target.value)} placeholder='Province' />
              <input type="text" className="form_group-input" name='detail' value={detail} onChange={(e) => setDetail(e.target.value)} placeholder='Detail' />
              <input type="text" className='form_group-input' name="dateTime" value={time} onChange={(e) => setTime(e.target.value)} placeholder={newToday} readOnly />
              <button type="submit" id='btn' className="">Gửi</button>
            </form>
            <button className='btn-check-list' onClick={() => setActive(!active)}>Kiểm tra danh sách</button>
          </div>
      }

      {
        active &&
        <div className="order-container">
          <p className="order-title">Đơn hàng đã tạo</p>
          {
            dataList.map((i) => (
              <div key={i.id} className='container-detail'>
                <div className='detail-item'>
                  <div className='item-icon'>
                    <i className="ri-edit-line"></i>
                    <i className="ri-delete-bin-line"></i>
                  </div>
                  <p><span>Name:</span> {i.name}</p>
                  <p><span>Province:</span> {i.province}</p>
                  <p><span>Detail</span> {i.detail}</p>
                </div>
              </div>
            ))
          }
        </div>
      }
    </div>
  );
}

export default App;

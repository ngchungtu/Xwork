import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';

// https://script.google.com/macros/s/AKfycbw4MFByMqKUV76fIpRmiD16Nr995p9WNNaY6u0HnWL7JXNlk60Kx7ntHT6XfIbhyz5f/exec

const API_URL = "https://opensheet.elk.sh/1Hcq2oszCNFxK5zDvJzkJDP3z4UyrEZg-vcpMdyx0WU8/api_xwork"

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

  const getDataFromApi = async () => {
    return await axios.get(API_URL).then((response) => {
      setDataList(response.data)
      console.log('_res', response.data);
    })
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formEle = document.querySelector("form");
    const formDatab = new FormData(formEle);
    fetch(
      "https://script.google.com/macros/s/AKfycbw4MFByMqKUV76fIpRmiD16Nr995p9WNNaY6u0HnWL7JXNlk60Kx7ntHT6XfIbhyz5f/exec",
      {
        method: "POST",
        body: formDatab
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(true)
        console.log(data);
        window.location.reload()
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
    // const data = {name, province, detail, time}
    // console.log(data);
  }

  useEffect(() => {
    getDataFromApi()
  }, [])
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      {
        loading
          ? <p>Loading...</p>
          : <div className="container-form">
            <form className='form_group' onSubmit={handleSubmitForm}>
              <input type="text" className="form_group-input-hidden" name="id" value={id} onChange={(e) => setId(e.target.value)} placeholder='Id' />
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

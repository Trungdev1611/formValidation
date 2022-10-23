import React, { useState } from "react";

interface msg {
  errUsername: string, errPassword: string, errMail: string, errphone: string
}
function App() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: ''
  })
  const [mesErr, setMesErr] = useState<msg>({ errUsername: "", errPassword: "", errMail: "", errphone: "" })
  //1 cach de lay duoc data trong form qua FormData
  // function handleSubmit(e) {
  //   e.preventDefault()
  //   let formData = new FormData(e.target)
  //   //data trong form la object voi key la name cua input va value la value input
  //   //dung trong js thif binh thuong, dung trong TS phai sua tsconfig
  //   let dataform = Object.fromEntries(formData.entries())
  // }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    let isSend = true
    let err = {
      errUsername: "", errPassword: "", errMail: "", errphone: ""
    }
    let regexPass = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W) /
    let regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    let regPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
    let { username, password, email, phone } = formData
    if (username.length < 5) {
      err.errUsername = "Username khong duoc nho hon 5 ky tu. "
      isSend = false

    }
    if (!regexPass.test(password)) {
      err.errPassword = err.errPassword + "Password phải có ít nhất một chữ viết thường, 1 chữ viết hoa, 1 số, 1 ký tự đặc biệt"
      isSend = false
    }
    if (!regEmail.test(email)) {
      err.errMail = err.errMail + "Mail không đúng định dạng"
      isSend = false
    }
    if (!regPhone.test(phone)) {
      err.errphone = err.errphone + "Phone không đúng định dạng"
      isSend = false
    }


    console.log(formData)
    setMesErr(err)
    if (isSend) {
      alert("submit form thanh cong")

    }
    else {
      alert("submit form that bai")
    }
  }
  console.log(mesErr)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

    setFormData({ ...formData, [e.target.name]: e.target.value })

  }
  return (
    <div className="App">
      <form action="/#" className="form-group" onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder="username" onChange={handleChange} value={formData.username} name={"username"} />
          {mesErr.errUsername ? <p className="error">{mesErr.errUsername} </p> : null}
        </div>
        <div>
          <input type="text" placeholder="password" onChange={handleChange} value={formData.password} name={"password"} required />
          {mesErr.errPassword ? <p className="error">{mesErr.errPassword} </p> : null}
        </div>
        <div>
          <input type="email" placeholder="email" onChange={handleChange} value={formData.email} name={"email"} required />
          {mesErr.errMail ? <p className="error">{mesErr.errMail} </p> : null}
        </div>
        <div>
          <input type="number" placeholder="phone" onChange={handleChange} value={formData.phone} name={"phone"} required />
          {mesErr.errphone ? <p className="error">{mesErr.errphone} </p> : null}
        </div>
        <div>
          <button>SubmitForm</button>
        </div>
      </form>
    </div>
  );
}

export default App;

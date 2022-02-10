import './App.css';
import React,{useState, useEffect} from 'react';


function App() {

  const [showPassword, setShowPassword] = useState(false);
  const [togglePasswordButton, setTogglePasswordButton] = useState(false);

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
    document.getElementById("password").focus();
  }

  const handleBlur = (e) => {
    const buttonTarget = e.relatedTarget && e.relatedTarget.id == "show-password";
    if (!buttonTarget){
      setShowPassword(false);
      setTogglePasswordButton(false);
    }
  }

  return (
    <>
      <div className="App">
        <div className="header">
          <img src="./images/logo.svg" height="45" width="167" alt="netflix-logo" />
        </div>

        <div className="loginForm">
          <h1>Oturum Aç</h1>
          <form autoComplete='off'>
            <div className="inputGroup">
              <div className="inputContainer">
                <input className="form-input" id="email_phone" type="text" autoComplete='none' required />
                <label className="form-label" htmlFor="email_phone">E-posta veya telefon numarası</label>
              </div>
              <div className="error">Lütfen geçerli bir telefon numarası veya e-posta adresi girin.</div>
            </div>
            <div className="inputGroup">
              <div className="inputContainer" id="passwordContainer">
                <input className="form-input" id="password" type={showPassword ? "text" : "password"} autoComplete='none' required 
                    onFocus={() => setTogglePasswordButton(true)} onBlur={handleBlur}/>
                <label className="form-label" htmlFor="password">Parola</label>
                <button id="show-password" style={{display: togglePasswordButton ? 'block' : 'none' }}
                  onClick={(handleShowPassword)} className="show-password">{showPassword ? "GİZLE" : "GÖSTER"}</button>
              </div>
              <div className="error">Parola 4 ile 60 karakter olmalıdır.</div>
            </div>
            <button type="button">Oturum Aç</button>
            <div className="infoContainer">
              <div className='rememberMe'>
                <input type="checkbox" />Beni Hatırla
              </div>
              <a className="help" href="/">Yardım ister misiniz?</a>
            </div>
          </form>
          <a href="/" className="fb-block">
            <img className="fb-logo" src="https://assets.nflxext.com/ffe/siteui/login/images/FB-f-Logo__blue_57.png" alt="facebook-logo" />
            <div className='fb-text'>Facebook ile Oturum Aç</div>
          </a>
          <div className='loginSignUpNow'>
            Netflix'e katılmak ister misiniz? <a className="signup-text" href="/">Şimdi kaydolun.</a>
          </div>
          <div className='recaptcha'>
            <div>Bu sayfa robot olmadığınızı kanıtlamak için Google reCAPTCHA tarafından korunuyor.</div>
            <a className="learn-more" href="/">Daha fazlasını öğrenin.</a>
          </div>
        </div>
      </div> 
    </>
  );
}

export default App;

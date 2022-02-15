import React, { useState } from 'react';
import '../styles/SignIn.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function SignIn() {

  //inputs
  const [emailPhone, setEmailPhone] = useState("");
  const [password, setPassword] = useState("");

  //errors
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  //show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [togglePasswordButton, setTogglePasswordButton] = useState(false);

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
    document.getElementById("password").focus();
  }

  const handleBlur = (e) => {
    const buttonTarget = e.relatedTarget && e.relatedTarget.id === "show-password";
    if (!buttonTarget) {
      setShowPassword(false);
      setTogglePasswordButton(false);
    }
  }

  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault();

    const emailError = emailPhone.length < 5;
    const passwordError = password.length < 4 || password.length > 60;

    if (!emailError && !passwordError) {
      console.log("emailPhone: " + emailPhone);
      console.log("password: " + password);
      setErrorEmail(false);
      setErrorPassword(false);
      const auth = getAuth()
      try {
        await signInWithEmailAndPassword(auth, emailPhone, password)
      } catch (err) {
        console.log(err);
      }
    }
    else {
      setErrorEmail(emailError);
      setErrorPassword(passwordError);
    }
  }, [emailPhone, password]);

  return (
    <>
      <div className="App">
        <div className="header">
          <img src="./images/logo.svg" height="45" width="167" alt="netflix-logo" />
        </div>

        <div className="loginForm">
          <h1>Oturum Aç</h1>
          <form autoComplete='off' onSubmit={handleSubmit}>
            <div className="inputGroup">
              <div className="inputContainer" style={{ borderBottom: errorEmail ? '3px solid #e87c03' : 'none' }}>
                <input className="form-input" id="email_phone" type="text" autoComplete='off' required value={emailPhone} onChange={e => setEmailPhone(e.target.value)} noValidate="" />
                <label className="form-label" htmlFor="email_phone">E-posta veya telefon numarası</label>
              </div>
              {errorEmail ? <div className="error">Lütfen geçerli bir telefon numarası veya e-posta adresi girin.</div> : undefined}
            </div>
            <div className="inputGroup">
              <div className="inputContainer" id="passwordContainer" style={{ borderBottom: errorPassword ? '3px solid #e87c03' : 'none' }}>
                <input className="form-input" id="password" type={showPassword ? "text" : "password"} autoComplete='off' required noValidate=""
                  onFocus={() => setTogglePasswordButton(true)} onBlur={handleBlur} value={password} onChange={e => setPassword(e.target.value)} />
                <label className="form-label" htmlFor="password">Parola</label>
                <button id="show-password" style={{ display: togglePasswordButton ? 'block' : 'none' }}
                  onClick={(handleShowPassword)} className="show-password">{showPassword ? "GİZLE" : "GÖSTER"}</button>
              </div>
              {errorPassword ? <div className="error">Parola 4 ile 60 karakter olmalıdır.</div> : undefined}
            </div>
            <button type="submit" formNoValidate>Oturum Aç</button>
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
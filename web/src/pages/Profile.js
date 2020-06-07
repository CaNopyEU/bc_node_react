import React, {Component} from "react";

import UsersList from '../components/Users/UsersList/UsersList';
import Modal from '../components/Modal/Modal';
import Spinner from '../components/Spinner/Spinner';
import './Profile.css';
import Backdrop from "../components/Backdrop/Backdrop";
import CreateProfile from "../components/CreateProfil/CreateProfile";

class ProfilePage extends Component {
  state = {
    creating: false,
    isLoading: false,
    users: [],
    selectedUser: null,
    userInfo: null,
  }


  render() {

    return (
      <>

        <h1>Moja žiacka knižka</h1>
        <div className="attendance-block">
          <button className="btn" style={{backgroundColor: '#356fff'}}>Slovenský jazyk</button>
          <button className="btn">Anglický jazyk</button>
          <button className="btn">Matematika</button>
          <div className="profile">
            <div className="predmet">Slovenský jazyk</div>
          <table>
            <tr >
            <span className="months">September</span>
              <td className="months">Október</td>
              <td className="months">November</td>
              <td className="months">December</td>
              <td className="months">Január</td>
              <td className="months">Február</td>
              <td className="months">Marec</td>
              <td className="months">Apríl</td>
              <td className="months">Máj</td>
              <td className="months">Jún</td>
            </tr>
            <tr >
              <td className="grades">1, 3, 4, 5, 3, 5, 4</td>
              <td className="grades">3 </td>
              <td className="grades">4, 2</td>
              <td className="grades">2, 3</td>
              <td className="grades">3</td>
              <td className="grades"> </td>
              <td className="grades">5</td>
              <td className="grades">1</td>
              <td className="grades">2</td>
              <td className="grades">1</td>
            </tr>
          </table>
          </div>
          {/*<div className="attendance-block-success">
              <p>20. 5. 2020</p>
              <p>Text ospravedľnenej neprítomnosti</p>
              <p>Nasledujúca neprítomnosť bola ospravedlnená</p>

            </div>*/}
          {/*<div className="profile">
            <span className="student">
              <p>Informácie o mne:</p>
            <p><span className="spacer">Meno:</span> <span style={{color: 'black'}}>Janko</span></p>
            <p><span className="spacer">Priezvisko:</span> <span style={{color: 'black'}}>Hrasko</span></p>
            <p><span className="spacer">Mesto:</span> <span style={{color: 'black'}}>Trnava</span></p>
            <p><span className="spacer">Ulica:</span> <span style={{color: 'black'}}>vymyslena</span></p>
            <p><span className="spacer">Číslo domu:</span> <span style={{color: 'black'}}>12</span></p>
            <p><span className="spacer">Dátum narodenia:</span> <span style={{color: 'black'}}>12. 3. 1995</span></p>
            <p><span className="spacer">Detail o študentovi:</span> <span style={{color: 'black'}}>kratky popisok</span></p>
              <p><span className="spacer">Žiakom triedy:</span> <span style={{color: 'black'}}>1. A</span></p>
            </span>
            <span className="parent">
              <p>Informácie o mojom zástupcovi:</p>
            <p><span className="spacer">Meno:</span> <span style={{color: 'black'}}>Ing. Jankov</span></p>
            <p><span className="spacer">Priezvisko:</span> <span style={{color: 'black'}}>Rodič</span></p>
            <p><span className="spacer">Email:</span> <span style={{color: 'black'}}>email@mail.sk</span></p>
            <p><span className="spacer">Dátum narodenia:</span> <span style={{color: 'black'}}>04.12.1972</span></p>
            <p><span className="spacer">Telefónne číslo:</span> <span
              style={{color: 'black'}}>+421 987 123 456</span></p>
            </span>
          </div>
*/}

        </div>
      </>
    )
  }
}

export default ProfilePage;
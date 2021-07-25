import React from "react";
import { Box, Typography } from "@material-ui/core";
import {Helmet} from 'react-helmet'
import icon from '../../assets/1.svg'
import iconn from '../../assets/2.svg'
import iconnn from '../../assets/3.svg'

function Info(props) {
  return (
      <div className="container wider" style={{height: 700}}>
        <div className="row" style={{marginTop: 60, height: 300}}>
          <div className="col-12 col-md-4 text-center">
            <div className="for-who-img">
              <img src={icon} alt="icon" width='200px'/>
            </div>
            <div className="for-who-caption" style={{marginTop: 30}}>
              <h5>
                Новичкам
              </h5>
            </div>
            <div className="for-who-description">
              Возможно, у тебя нет никаких базовых знаний. Это и не важно. Мы учим с нуля.
            </div>
          </div>
          <div className="col-12 col-md-4 text-center">
            <div className="for-who-img d-flex justify-content-center">
              <img src={iconnn} alt="icon" width="140px"/>
            </div>
            <div className="for-who-caption" style={{marginTop: 26}}>
              <h5>
                Студентам
              </h5>
            </div>
            <div className="for-who-description">
              Без информатики никуда, а на скучных парах ничему не научишься. Нужен новый подход.
            </div>
          </div>
          <div className="col-12 col-md-4 text-center">
            <div className="for-who-img">
              <img src={iconn} alt="icon" width="112px"/>
            </div>
            <div className="for-who-caption" style={{marginTop: 11}}>
              <h5>
                Владельцам бизнеса
              </h5>
            </div>
            <div className="for-who-description">
              Два месяца уроков и у твоего бизнеса будет новый сайт. Возможно интернет-магазин.
            </div>
          </div>
        </div>
        <div className='row' style={{marginTop: 40, marginBottom: 60}}>
          <div className='col-12'>
            <hr/>
          </div>
        </div>
        <div className='row'>
          <div className="col-4 text-center"><h3 style={{marginBottom: 30, color: '#4c4dc3'}}>Офис</h3>
            364024, г. Грозный, ул. А. Трошева, 7

            +7 (8712) 29-48-32

            mail@chesu.ru</div>
          <div className="col-4 text-center"><h3 style={{marginBottom: 30, color: '#4c4dc3'}}>Приемная менеджера</h3>
            364060, г. Грозный, ул. Трошева, 7

            +7 (8712) 21-20-04

            pk@chesu.ru</div>
          <div className="col-4 text-center"><h3 style={{marginBottom: 30, color: '#4c4dc3'}}>Приемная главаря мафии</h3>
            364024, г. Грозный, ул. А. Трошева, 7

            +7 (8712) 29-00-04

            z.saidov@chesu.ru
          </div>
        </div>
      </div>
  );
}

export default Info;

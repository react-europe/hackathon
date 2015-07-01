import React from 'react';
import './Score.scss';

const countries = {"ad":"andorra","ae":"emirates","af":"afghanistan","ag":"antigua and barbuda","ai":"anguilla","al":"albania","am":"armenia","ao":"angola","aq":"antarctica","ar":"argentina","as":"american samoa","at":"austria","au":"australia","aw":"aruba","az":"azerbaijan","ba":"bosnia","bb":"barbados","bd":"bangladesh","be":"belgium","bf":"burkina faso","bg":"bulgaria","bh":"bahrain","bi":"burundi","bj":"benin","bl":"saint barth?lemy","bm":"bermuda","bn":"brunei darussalam","bo":"bolivia","bq":"bonaire, sint eustatius and saba","br":"brazil","bs":"bahamas","bt":"bhutan","bv":"bouvet island","bw":"botswana","by":"belarus","bz":"belize","ca":"canada","cc":"cocos (keeling) islands","cd":"congo (democratic republic of the)","cf":"central african republic","cg":"congo","ch":"switzerland","ci":"c?te d'ivoire","ck":"cook islands","cl":"chile","cm":"cameroon","cn":"china","co":"colombia","cr":"costa rica","cu":"cuba","cv":"cabo verde","cw":"cura?ao","cx":"christmas island","cy":"cyprus","cz":"czech","de":"germany","dj":"djibouti","dk":"denmark","dm":"dominica","do":"dominican republic","dz":"algeria","ec":"ecuador","ee":"estonia","eg":"egypt","eh":"western sahara","er":"eritrea","es":"spain","et":"ethiopia","fi":"finland","fj":"fiji","fk":"falkland islands (malvinas)","fm":"micronesia (federated states of)","fo":"faroe islands","fr":"france","ga":"gabon","gb":"britain","gd":"grenada","ge":"georgia","gf":"french guiana","gg":"guernsey","gh":"ghana","gi":"gibraltar","gl":"greenland","gm":"gambia","gn":"guinea","gp":"guadeloupe","gq":"equatorial guinea","gr":"greece","gs":"south georgia and the south sandwich islands","gt":"guatemala","gu":"guam","gw":"guinea-bissau","gy":"guyana","hk":"hong kong","hm":"heard island and mcdonald islands","hn":"honduras","hr":"croatia","ht":"haiti","hu":"hungary","id":"indonesia","ie":"ireland","il":"israel","im":"isle of man","in":"india","io":"british indian ocean territory","iq":"iraq","ir":"iran","is":"iceland","it":"italy","je":"jersey","jm":"jamaica","jo":"jordan","jp":"japan","ke":"kenya","kg":"kyrgyzstan","kh":"cambodia","ki":"kiribati","km":"comoros","kn":"saint kitts and nevis","kp":"north korea","kr":"south korea","kw":"kuwait","ky":"cayman islands","kz":"kazakhstan","la":"lao people's democratic republic","lb":"lebanon","lc":"saint lucia","li":"liechtenstein","lk":"sri lanka","lr":"liberia","ls":"lesotho","lt":"lithuania","lu":"luxembourg","lv":"latvia","ly":"libya","ma":"morocco","mc":"monaco","md":"moldova","me":"montenegro","mf":"saint martin (french part)","mg":"madagascar","mh":"marshall islands","mk":"macedonia","ml":"mali","mm":"myanmar","mn":"mongolia","mo":"macao","mp":"northern mariana islands","mq":"martinique","mr":"mauritania","ms":"montserrat","mt":"malta","mu":"mauritius","mv":"maldives","mw":"malawi","mx":"mexico","my":"malaysia","mz":"mozambique","na":"namibia","nc":"new caledonia","ne":"niger","nf":"norfolk island","ng":"nigeria","ni":"nicaragua","nl":"The Netherlands","no":"norway","np":"nepal","nr":"nauru","nu":"niue","nz":"new zealand","om":"oman","pa":"panama","pe":"peru","pf":"french polynesia","pg":"papua new guinea","ph":"philippines","pk":"pakistan","pl":"poland","pm":"saint pierre and miquelon","pn":"pitcairn","pr":"puerto rico","ps":"palestine, state of","pt":"portugal","pw":"palau","py":"paraguay","qa":"qatar","re":"r?union","ro":"romania","rs":"serbia and montenegro","ru":"russia","rw":"rwanda","sa":"saudi","sb":"solomon islands","sc":"seychelles","sd":"sudan","se":"sweden","sg":"singapore","sh":"saint helena, ascension and tristan da cunha","si":"slovenia","sj":"svalbard and jan mayen","sk":"slovakia","sl":"sierra leone","sm":"san marino","sn":"senegal","so":"somalia","sr":"suriname","ss":"south sudan","st":"sao tome and principe","sv":"el salvador","sx":"sint maarten (dutch part)","sy":"syria","sz":"swaziland","tc":"turks and caicos islands","td":"chad","tf":"french southern territories","tg":"togo","th":"thailand","tj":"tajikistan","tk":"tokelau","tl":"timor-leste","tm":"turkmenistan","tn":"tunisia","to":"tonga","tr":"turkey","tt":"trinidad and tobago","tv":"tuvalu","tw":"taiwan, province of china","tz":"tanzania, united republic of","ua":"ukraine","ug":"uganda","um":"united states minor outlying islands","us":"usa","uy":"uruguay","uz":"uzbekistan","va":"holy see","vc":"saint vincent and the grenadines","ve":"venezuela","vg":"virgin islands (british)","vi":"virgin islands (u.s.)","vn":"vietnam","vu":"vanuatu","wf":"wallis and futuna","ws":"samoa","ye":"yemen","yt":"mayotte","za":"south africa","zm":"zambia","zw":"zimbabwe"};

/**
 * This class defines the Grid store.
 *
 * @class GridStore
 */
class Score extends React.Component {
  
  /**
   * Render method.
   *
   * @method render
   * @return Markup for the component
   */
  render() {
    const meetup = this.props.hit;
    let info = meetup ? this.createInfo( meetup ) : '';
      
    return (
      <div className="score">
        {info}
        <div className="fadeout"></div>
      </div>
    );
  }

  /**
   * Create info.
   *
   * @method createInfo
   * @param {Object} meetup Meetup object
   */
  createInfo(meetup) {
    const title = meetup.name;
    const img = meetup.photo_urls.thumb ? <img src={meetup.photo_urls.thumb} /> : '' ;
    
    let country = countries[meetup.country];
    country = country.charAt(0).toUpperCase() + country.slice(1);
    
    const location = meetup.city + ', ' + country;
    const date = meetup.org_starttime;
    const short_desc = { __html: meetup.short_desc};
    
    return (
      <div className="info">
        <h1>{title}</h1>
        <div className="locationdate">{location}, {date}</div>
        <div dangerouslySetInnerHTML={short_desc}></div>
      </div>
    );
  }
}

export default Score;

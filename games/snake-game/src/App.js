import React from 'react';
import Snake from 'snake-game-react';
const App = () => { 
return (
   <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    minHeight:'100vh'
   }}>
   <Snake 
       color1="#248ec2"
       color2="#1d355e"
       backgroundColor="#ebebeb"
       />
   </div>
 );
 }
export default App;

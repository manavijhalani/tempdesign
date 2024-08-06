import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './css/App.css';
import front from './images/front.png';
import { Card, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const themes = {
    dark: [
      { background: '#000000', text: '#FFFFFF' },
      { background: '#1a1a1a', text: '#e0e0e0' },
      { background: '#2b2b2b', text: '#f5f5f5' },
      { background: '#333333', text: '#dddddd' },
      { background: '#3d3d3d', text: '#cccccc' },
      { background: '#454545', text: '#bbbbbb' },
      { background: '#4d4d4d', text: '#aaaaaa' },
      { background: '#555555', text: '#999999' },
      { background: '#5d5d5d', text: '#888888' },
      { background: '#666666', text: '#777777' },
      { background: '#707070', text: '#666666' },
      { background: '#787878', text: '#555555' },
      { background: '#808080', text: '#444444' },
      { background: '#888888', text: '#333333' },
      { background: '#909090', text: '#222222' },
      { background: '#989898', text: '#111111' },
      { background: '#a0a0a0', text: '#000000' },
      { background: '#a8a8a8', text: '#0f0f0f' },
      { background: '#b0b0b0', text: '#1f1f1f' },
      { background: '#b8b8b8', text: '#2f2f2f' },
    ],
    light: [
      { background: '#FFFFFF', text: '#000000' },
      { background: '#f8f8f8', text: '#111111' },
      { background: '#f0f0f0', text: '#222222' },
      { background: '#e8e8e8', text: '#333333' },
      { background: '#e0e0e0', text: '#444444' },
      { background: '#d8d8d8', text: '#555555' },
      { background: '#d0d0d0', text: '#666666' },
      { background: '#c8c8c8', text: '#777777' },
      { background: '#c0c0c0', text: '#888888' },
      { background: '#b8b8b8', text: '#999999' },
      { background: '#b0b0b0', text: '#aaaaaa' },
      { background: '#a8a8a8', text: '#bbbbbb' },
      { background: '#a0a0a0', text: '#cccccc' },
      { background: '#989898', text: '#dddddd' },
      { background: '#909090', text: '#eeeeee' },
      { background: '#888888', text: '#ffffff' },
      { background: '#808080', text: '#0f0f0f' },
      { background: '#787878', text: '#1f1f1f' },
      { background: '#707070', text: '#2f2f2f' },
      { background: '#686868', text: '#3f3f3f' },
    ],
    triadic: [
      { background: '#FF5733', text: '#33FF57' },
      { background: '#FF6F47', text: '#33FF57' },
      { background: '#FF875B', text: '#33FF57' },
      { background: '#FF9F6F', text: '#33FF57' },
      { background: '#FFB783', text: '#33FF57' },
      { background: '#FFD097', text: '#33FF57' },
      { background: '#FFE8AB', text: '#33FF57' },
      { background: '#FFF0BF', text: '#33FF57' },
      { background: '#FF5733', text: '#3F4FFF' },
      { background: '#FF6F47', text: '#4FFF3F' },
      { background: '#FF875B', text: '#3F4FFF' },
      { background: '#FF9F6F', text: '#4FFF3F' },
      { background: '#FFB783', text: '#3F4FFF' },
      { background: '#FFD097', text: '#4FFF3F' },
      { background: '#FFE8AB', text: '#3F4FFF' },
      { background: '#FFF0BF', text: '#4FFF3F' },
      { background: '#FF5733', text: '#4FFF3F' },
      { background: '#FF6F47', text: '#3F4FFF' },
      { background: '#FF875B', text: '#4FFF3F' },
      { background: '#FF9F6F', text: '#3F4FFF' },
    ],
    complementary: [
      { background: '#001F3F', text: '#FF4136' },
      { background: '#002B4F', text: '#FF4136' },
      { background: '#00375F', text: '#FF4136' },
      { background: '#00436F', text: '#FF4136' },
      { background: '#00507F', text: '#FF4136' },
      { background: '#005C8F', text: '#FF4136' },
      { background: '#00689F', text: '#FF4136' },
      { background: '#0074AF', text: '#FF4136' },
      { background: '#001F3F', text: '#FF534F' },
      { background: '#002B4F', text: '#FF534F' },
      { background: '#00375F', text: '#FF534F' },
      { background: '#00436F', text: '#FF534F' },
      { background: '#00507F', text: '#FF534F' },
      { background: '#005C8F', text: '#FF534F' },
      { background: '#00689F', text: '#FF534F' },
      { background: '#0074AF', text: '#FF534F' },
      { background: '#001F3F', text: '#FF6657' },
      { background: '#002B4F', text: '#FF6657' },
      { background: '#00375F', text: '#FF6657' },
      { background: '#00436F', text: '#FF6657' },
    ],
    ocean: [
      { background: '#0077B6', text: '#90E0EF' },
      { background: '#00629A', text: '#90E0EF' },
      { background: '#00508E', text: '#90E0EF' },
      { background: '#004582', text: '#90E0EF' },
      { background: '#003B76', text: '#90E0EF' },
      { background: '#00316A', text: '#90E0EF' },
      { background: '#00275E', text: '#90E0EF' },
      { background: '#001D52', text: '#90E0EF' },
      { background: '#0077B6', text: '#A0F0EF' },
      { background: '#00629A', text: '#A0F0EF' },
      { background: '#00508E', text: '#A0F0EF' },
      { background: '#004582', text: '#A0F0EF' },
      { background: '#003B76', text: '#A0F0EF' },
      { background: '#00316A', text: '#A0F0EF' },
      { background: '#00275E', text: '#A0F0EF' },
      { background: '#001D52', text: '#A0F0EF' },
      { background: '#0077B6', text: '#B0FFEF' },
      { background: '#00629A', text: '#B0FFEF' },
      { background: '#00508E', text: '#B0FFEF' },
      { background: '#004582', text: '#B0FFEF' },
    ],
    forest: [
      { background: '#2E8B57', text: '#F0E68C' },
      { background: '#26774B', text: '#F0E68C' },
      { background: '#1E6340', text: '#F0E68C' },
      { background: '#165034', text: '#F0E68C' },
      { background: '#0E3C28', text: '#F0E68C' },
      { background: '#06291C', text: '#F0E68C' },
      { background: '#002610', text: '#F0E68C' },
      { background: '#004B1C', text: '#F0E68C' },
      { background: '#00602B', text: '#F0E68C' },
      { background: '#00753B', text: '#F0E68C' },
      { background: '#008A4A', text: '#F0E68C' },
      { background: '#009F59', text: '#F0E68C' },
      { background: '#00B469', text: '#F0E68C' },
      { background: '#00C978', text: '#F0E68C' },
      { background: '#00DE87', text: '#F0E68C' },
      { background: '#00F396', text: '#F0E68C' },
      { background: '#10F7A5', text: '#F0E68C' },
      { background: '#20FBB4', text: '#F0E68C' },
      { background: '#30FFC3', text: '#F0E68C' },
      { background: '#40FFD2', text: '#F0E68C' },
    ],
    sunset: [
      { background: '#FF4500', text: '#FFD700' },
      { background: '#FF5200', text: '#FFD700' },
      { background: '#FF5F00', text: '#FFD700' },
      { background: '#FF6C00', text: '#FFD700' },
      { background: '#FF7900', text: '#FFD700' },
      { background: '#FF8600', text: '#FFD700' },
      { background: '#FF9300', text: '#FFD700' },
      { background: '#FFA000', text: '#FFD700' },
      { background: '#FFAD00', text: '#FFD700' },
      { background: '#FFBA00', text: '#FFD700' },
      { background: '#FFC700', text: '#FFD700' },
      { background: '#FFD400', text: '#FFD700' },
      { background: '#FFE100', text: '#FFD700' },
      { background: '#FFEE00', text: '#FFD700' },
      { background: '#FFFB00', text: '#FFD700' },
      { background: '#FFFF00', text: '#FFD700' },
      { background: '#F8F800', text: '#FFD700' },
      { background: '#F1F100', text: '#FFD700' },
      { background: '#EAEA00', text: '#FFD700' },
      { background: '#E3E300', text: '#FFD700' },
    ],
    pastel: [
      { background: '#FFB6C1', text: '#4682B4' },
      { background: '#FFC6C9', text: '#4682B4' },
      { background: '#FFD6D1', text: '#4682B4' },
      { background: '#FFE6D9', text: '#4682B4' },
      { background: '#FFF6E1', text: '#4682B4' },
      { background: '#FFF6F1', text: '#4682B4' },
      { background: '#F6E1F1', text: '#4682B4' },
      { background: '#E6D1F1', text: '#4682B4' },
      { background: '#D6C1F1', text: '#4682B4' },
      { background: '#C6B1F1', text: '#4682B4' },
      { background: '#B6A1F1', text: '#4682B4' },
      { background: '#A691F1', text: '#4682B4' },
      { background: '#9681F1', text: '#4682B4' },
      { background: '#8671F1', text: '#4682B4' },
      { background: '#7661F1', text: '#4682B4' },
      { background: '#6651F1', text: '#4682B4' },
      { background: '#5641F1', text: '#4682B4' },
      { background: '#4631F1', text: '#4682B4' },
      { background: '#3621F1', text: '#4682B4' },
      { background: '#2611F1', text: '#4682B4' },
    ],
    vintage: [
      { background: '#6B4E71', text: '#D4B5B0' },
      { background: '#705671', text: '#D4B5B0' },
      { background: '#755E71', text: '#D4B5B0' },
      { background: '#7A6671', text: '#D4B5B0' },
      { background: '#7F6E71', text: '#D4B5B0' },
      { background: '#847671', text: '#D4B5B0' },
      { background: '#897E71', text: '#D4B5B0' },
      { background: '#8E8671', text: '#D4B5B0' },
      { background: '#937071', text: '#D4B5B0' },
      { background: '#987871', text: '#D4B5B0' },
      { background: '#9D8071', text: '#D4B5B0' },
      { background: '#A28871', text: '#D4B5B0' },
      { background: '#A79071', text: '#D4B5B0' },
      { background: '#AC9871', text: '#D4B5B0' },
      { background: '#B1A071', text: '#D4B5B0' },
      { background: '#B6A871', text: '#D4B5B0' },
      { background: '#BBB071', text: '#D4B5B0' },
      { background: '#C0B871', text: '#D4B5B0' },
      { background: '#C5C071', text: '#D4B5B0' },
      { background: '#CAC871', text: '#D4B5B0' },
    ],
    minimal: [
      { background: '#F0F0F0', text: '#333333' },
      { background: '#E0E0E0', text: '#444444' },
      { background: '#D0D0D0', text: '#555555' },
      { background: '#C0C0C0', text: '#666666' },
      { background: '#B0B0B0', text: '#777777' },
      { background: '#A0A0A0', text: '#888888' },
      { background: '#909090', text: '#999999' },
      { background: '#808080', text: '#AAAAAA' },
      { background: '#707070', text: '#BBBBBB' },
      { background: '#606060', text: '#CCCCCC' },
      { background: '#505050', text: '#DDDDDD' },
      { background: '#404040', text: '#EEEEEE' },
      { background: '#303030', text: '#FFFFFF' },
      { background: '#202020', text: '#111111' },
      { background: '#101010', text: '#222222' },
      { background: '#000000', text: '#333333' },
      { background: '#080808', text: '#444444' },
      { background: '#181818', text: '#555555' },
      { background: '#282828', text: '#666666' },
      { background: '#383838', text: '#777777' },
    ],
    beach: [
      { background: '#F7D8BA', text: '#006994' },
      { background: '#F8E0C0', text: '#007FA5' },
      { background: '#F9E8C6', text: '#0096B6' },
      { background: '#FAF0CC', text: '#00ADC7' },
      { background: '#FBF8D2', text: '#00C4D8' },
      { background: '#FCFFD8', text: '#00DBE9' },
      { background: '#FDFFDE', text: '#00F2FA' },
      { background: '#FFFFE4', text: '#00FFF0' },
      { background: '#FFFFEA', text: '#00FFF5' },
      { background: '#FFFFF0', text: '#00FFFA' },
      { background: '#FFFFF6', text: '#00FFFF' },
      { background: '#FFFFFC', text: '#00FFFF' },
      { background: '#FFFFF6', text: '#00E0FF' },
      { background: '#FFFFF0', text: '#00C0FF' },
      { background: '#FFFFEA', text: '#00A0FF' },
      { background: '#FFFFE4', text: '#0080FF' },
      { background: '#FDFFDE', text: '#0060FF' },
      { background: '#FCFFD8', text: '#0040FF' },
      { background: '#FBF8D2', text: '#0020FF' },
      { background: '#FAF0CC', text: '#0000FF' },
    ],
    spring: [
      { background: '#FDE8E9', text: '#6A0572' },
      { background: '#FCE2E3', text: '#76078B' },
      { background: '#FBDCDC', text: '#8209A4' },
      { background: '#FAD6D6', text: '#8E0BBD' },
      { background: '#F9D0D0', text: '#9A0DD6' },
      { background: '#F8CAC9', text: '#A60FEF' },
      { background: '#F7C4C3', text: '#B210FF' },
      { background: '#F6BEBD', text: '#BE12FF' },
      { background: '#F5B8B7', text: '#CA14FF' },
      { background: '#F4B2B1', text: '#D616FF' },
      { background: '#F3ACAB', text: '#E218FF' },
      { background: '#F2A6A5', text: '#EE1AFF' },
      { background: '#F1A0A0', text: '#FA1CFF' },
      { background: '#F09A9A', text: '#FF1EFF' },
      { background: '#EF9494', text: '#FF20FF' },
      { background: '#EE8E8E', text: '#FF22FF' },
      { background: '#ED8888', text: '#FF24FF' },
      { background: '#EC8282', text: '#FF26FF' },
      { background: '#EB7C7C', text: '#FF28FF' },
      { background: '#EA7676', text: '#FF2AFF' },
    ],
    autumn: [
      { background: '#D2691E', text: '#FFD700' },
      { background: '#D87528', text: '#FFD700' },
      { background: '#DE8132', text: '#FFD700' },
      { background: '#E48D3C', text: '#FFD700' },
      { background: '#EA9946', text: '#FFD700' },
      { background: '#F0A550', text: '#FFD700' },
      { background: '#F6B15A', text: '#FFD700' },
      { background: '#FCBD64', text: '#FFD700' },
      { background: '#FFD970', text: '#FFD700' },
      { background: '#FFEB7C', text: '#FFD700' },
      { background: '#FFF888', text: '#FFD700' },
      { background: '#FFFF94', text: '#FFD700' },
      { background: '#FFFFA0', text: '#FFD700' },
      { background: '#FFFFAC', text: '#FFD700' },
      { background: '#FFFFB8', text: '#FFD700' },
      { background: '#FFFFC4', text: '#FFD700' },
      { background: '#FFFFD0', text: '#FFD700' },
      { background: '#FFFFDC', text: '#FFD700' },
      { background: '#FFFFE8', text: '#FFD700' },
      { background: '#FFFFF4', text: '#FFD700' },
    ],
    neon: [
      { background: '#0F0F0F', text: '#39FF14' },
      { background: '#1F1F1F', text: '#3BFF1E' },
      { background: '#2F2F2F', text: '#3DFF28' },
      { background: '#3F3F3F', text: '#3FFF32' },
      { background: '#4F4F4F', text: '#41FF3C' },
      { background: '#5F5F5F', text: '#43FF46' },
      { background: '#6F6F6F', text: '#45FF50' },
      { background: '#7F7F7F', text: '#47FF5A' },
      { background: '#8F8F8F', text: '#49FF64' },
      { background: '#9F9F9F', text: '#4BFF6E' },
      { background: '#AFAFAF', text: '#4DFF78' },
      { background: '#BFBFBF', text: '#4FFF82' },
      { background: '#CFCFCF', text: '#51FF8C' },
      { background: '#DFDFDF', text: '#53FF96' },
      { background: '#EFEFEF', text: '#55FFA0' },
      { background: '#FFFFFF', text: '#57FFAA' },
      { background: '#FFFFFF', text: '#59FFB4' },
      { background: '#FFFFFF', text: '#5BFFBE' },
      { background: '#FFFFFF', text: '#5DFFC8' },
      { background: '#FFFFFF', text: '#5FFFD2' },
    ],
    lavender: [
      { background: '#E6E6FA', text: '#4B0082' },
      { background: '#ECEAF0', text: '#4B0082' },
      { background: '#F2EEF6', text: '#4B0082' },
      { background: '#F8F2FC', text: '#4B0082' },
      { background: '#FEF6FF', text: '#4B0082' },
      { background: '#FFFFFF', text: '#4B0082' },
      { background: '#FFFFFF', text: '#4B0F82' },
      { background: '#FFFFFF', text: '#4B1F82' },
      { background: '#FFFFFF', text: '#4B2F82' },
      { background: '#FFFFFF', text: '#4B3F82' },
      { background: '#FFFFFF', text: '#4B4F82' },
      { background: '#FFFFFF', text: '#4B5F82' },
      { background: '#FFFFFF', text: '#4B6F82' },
      { background: '#FFFFFF', text: '#4B7F82' },
      { background: '#FFFFFF', text: '#4B8F82' },
      { background: '#FFFFFF', text: '#4B9F82' },
      { background: '#FFFFFF', text: '#4BAF82' },
      { background: '#FFFFFF', text: '#4BBF82' },
      { background: '#FFFFFF', text: '#4BCF82' },
      { background: '#FFFFFF', text: '#4BDF82' },
    ],
    twilight: [
      { background: '#2C3E50', text: '#E74C3C' },
      { background: '#2F4053', text: '#E74C3C' },
      { background: '#324256', text: '#E74C3C' },
      { background: '#354459', text: '#E74C3C' },
      { background: '#37465C', text: '#E74C3C' },
      { background: '#3A4860', text: '#E74C3C' },
      { background: '#3D4A63', text: '#E74C3C' },
      { background: '#404C66', text: '#E74C3C' },
      { background: '#424E69', text: '#E74C3C' },
      { background: '#45506C', text: '#E74C3C' },
      { background: '#48526F', text: '#E74C3C' },
      { background: '#4B5472', text: '#E74C3C' },
      { background: '#4E5675', text: '#E74C3C' },
      { background: '#505878', text: '#E74C3C' },
      { background: '#535A7B', text: '#E74C3C' },
      { background: '#565C7E', text: '#E74C3C' },
      { background: '#595E81', text: '#E74C3C' },
      { background: '#5C6084', text: '#E74C3C' },
      { background: '#5E6287', text: '#E74C3C' },
      { background: '#61648A', text: '#E74C3C' },
    ],
    ivory: [
      { background: '#FFFFF0', text: '#2F4F4F' },
      { background: '#FFFFE8', text: '#2F4F4F' },
      { background: '#FFFFE0', text: '#2F4F4F' },
      { background: '#FFFFD8', text: '#2F4F4F' },
      { background: '#FFFFD0', text: '#2F4F4F' },
      { background: '#FFFFC8', text: '#2F4F4F' },
      { background: '#FFFFC0', text: '#2F4F4F' },
      { background: '#FFFFB8', text: '#2F4F4F' },
      { background: '#FFFFB0', text: '#2F4F4F' },
      { background: '#FFFFA8', text: '#2F4F4F' },
      { background: '#FFFFA0', text: '#2F4F4F' },
      { background: '#FFFF98', text: '#2F4F4F' },
      { background: '#FFFF90', text: '#2F4F4F' },
      { background: '#FFFF88', text: '#2F4F4F' },
      { background: '#FFFF80', text: '#2F4F4F' },
      { background: '#FFFF78', text: '#2F4F4F' },
      { background: '#FFFF70', text: '#2F4F4F' },
      { background: '#FFFF68', text: '#2F4F4F' },
      { background: '#FFFF60', text: '#2F4F4F' },
      { background: '#FFFF58', text: '#2F4F4F' },
    ],
    forest: [
      { background: '#2E8B57', text: '#FFFFFF' },
      { background: '#319C60', text: '#FFFFFF' },
      { background: '#34AD69', text: '#FFFFFF' },
      { background: '#37BE72', text: '#FFFFFF' },
      { background: '#3ACF7B', text: '#FFFFFF' },
      { background: '#3DD084', text: '#FFFFFF' },
      { background: '#40D18D', text: '#FFFFFF' },
      { background: '#43D296', text: '#FFFFFF' },
      { background: '#46D39F', text: '#FFFFFF' },
      { background: '#49D4A8', text: '#FFFFFF' },
      { background: '#4CD5B1', text: '#FFFFFF' },
      { background: '#4FD6BA', text: '#FFFFFF' },
      { background: '#52D7C3', text: '#FFFFFF' },
      { background: '#55D8CC', text: '#FFFFFF' },
      { background: '#58D9D5', text: '#FFFFFF' },
      { background: '#5BDADE', text: '#FFFFFF' },
      { background: '#5EDBE7', text: '#FFFFFF' },
      { background: '#61DDF0', text: '#FFFFFF' },
      { background: '#64DEF9', text: '#FFFFFF' },
      { background: '#67E0FF', text: '#FFFFFF' },
    ],
  };

export default function Home() {
  const navigate = useNavigate(); 
  const [theme, setTheme] = useState('dark');
  const [colorIndex, setColorIndex] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [reposData, setReposData] = useState([]);


  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    const savedColorIndex = localStorage.getItem('selectedColorIndex');
    if (savedTheme) setTheme(savedTheme);
    if (savedColorIndex) setColorIndex(parseInt(savedColorIndex));
  }, []);

  useEffect(()=>{
    //const gitname=await axios.get(`https://api.github.com/users/${username}`)
 async function fetchData(){
    const reposResponse = await axios.get(`https://api.github.com/users/ayeshasiddiqui591/repos`);
    setReposData(reposResponse.data);
    
 } 
 fetchData();
    
  })

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
    setColorIndex(0);
    localStorage.setItem('selectedTheme', event.target.value);
    localStorage.setItem('selectedColorIndex', 0);
  };

  const handleColorChange = (event) => {
    setColorIndex(event.target.value);
    localStorage.setItem('selectedColorIndex', event.target.value);
  };

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = () => {
    setComments([...comments, commentText]);
    setCommentText('');
  };
  
  const paymentpage = () => {
      navigate('/');
    };
  
  return (
    <div
      className="App"
      style={{
        flexGrow: 1,
        backgroundColor: themes[theme][colorIndex].text,
        color: themes[theme][colorIndex].background,
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        const newTheme = Object.keys(themes)[Math.floor(Math.random() * Object.keys(themes).length)];
        setTheme(newTheme);
        setColorIndex(0);
        localStorage.setItem('selectedTheme', newTheme);
        localStorage.setItem('selectedColorIndex', 0);
      }}
    >

      <div>
        <FormControl variant="outlined" style={{ minWidth: 120, margin: '10px' }}>
          <InputLabel style={{ color: themes[theme][colorIndex].text }}>Theme</InputLabel>
          <Select value={theme} onChange={handleThemeChange} style={{ color: themes[theme][colorIndex].text, borderColor: themes[theme][colorIndex].text }}>
            {Object.keys(themes).map((themeKey) => (
              <MenuItem key={themeKey} value={themeKey}>
                {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)} Theme
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ minWidth: 120, margin: '10px' }}>
          <InputLabel style={{ color: themes[theme][colorIndex].text }}>Color</InputLabel>
          <Select value={colorIndex} onChange={handleColorChange} style={{ color: themes[theme][colorIndex].text, borderColor: themes[theme][colorIndex].text }}>
            {themes[theme].map((color, index) => (
              <MenuItem key={index} value={index}>
                {`Color ${index + 1}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ minWidth: 140, margin: '20px' }}>
            <Button  variant="outlined" style={{ color: themes[theme][colorIndex].background }}
            onClick={paymentpage}
            >Pay</Button>
        </FormControl>
      </div>
      <Card style={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>
      <AppBar position="static" sx={{ display:'space-between', justifyContent:'center', backgroundColor: themes[theme][colorIndex].background }}>
          <Button href="#home" title="Home" sx={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>Home</Button>
          <Button href="#about" title="About Us" sx={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>About Us</Button>
          <Button href="#skill" title="Skill" sx={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>Skills</Button>
          <Button href="#experience" title="Experience" sx={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>Experience</Button>
          <Button href="#education" title="Education" sx={{ backgroundColor:themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>Education</Button>
          <Button href="#project" title="Project" sx={{ backgroundColor: themes[theme][colorIndex].background, color:themes[theme][colorIndex].text }}>Projects</Button>
          <Button href="#contactus" title="Contact Us" sx={{ backgroundColor:themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>Contact Us</Button>
        </AppBar>
        <br />
        <Box id="home" style={{ display: 'flex', alignItems: 'center', backgroundColor: themes[theme][colorIndex].background, padding: '2%' }}>
          <img src={front} alt="Front display" style={{ maxWidth: '60%', height: '50%', objectFit: 'cover', justifyContent: 'left', alignItems: 'left' }} />
          <Box style={{ display: 'block', alignItems: 'center' }}>
            <Typography variant="h2" style={{ color: themes[theme][colorIndex].text, fontSize: 40 }}>
              Name Surname
              <br />
              Job Position
            </Typography>
            <br />
            <Button>
              <Typography style={{ color: themes[theme][colorIndex].text }}>Download Resume</Typography>
            </Button>
          </Box>
        </Box>
      </Card>
      <Divider variant="middle" style={{ backgroundColor: themes[theme][colorIndex].text }} />
      <br />
      <Card style={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>
        <Box id="about" style={{ display: 'block', alignItems: 'center', backgroundColor: themes[theme][colorIndex].background, padding: '2%' }}>
          <Typography variant="h4" style={{ color: themes[theme][colorIndex].text }}>
            About Us
          </Typography>
          <br />
          <Box style={{ display: 'flex', alignItems: 'center', backgroundColor: themes[theme][colorIndex].background, padding: '2%' }}>
            <Typography variant="body1" style={{ color: themes[theme][colorIndex].text }}>
              Summary
            </Typography>
            <img src={front} alt="Front display" style={{ maxWidth: '60%', height: '50%', justifyContent: 'right', alignItems: 'right' }} />
          </Box>
        </Box>
      </Card>
      <Divider variant="middle" style={{ backgroundColor: themes[theme][colorIndex].text }} />
      <br />
      <Card style={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>
        <Box id="skill" style={{ display: 'flex', alignItems: 'center', backgroundColor: themes[theme][colorIndex].background, padding: '2%' }}>
          <Typography variant="h4" style={{ color: themes[theme][colorIndex].text }}>
            Skills
            <br />
          </Typography>
          <Box style={{ display: 'block', alignItems: 'center', backgroundColor: themes[theme][colorIndex].background, padding: '2%' }}>
            <br />
            <Typography variant="body1" style={{ color: themes[theme][colorIndex].text }}>
              - Skill 1
              <br />
              - Skill 2
              <br />
              - Skill 3
              <br />
              - Skill 4
            </Typography>
          </Box>
        </Box>
      </Card>
      <Divider variant="middle" style={{ backgroundColor: themes[theme][colorIndex].text }} />
      <br />
      <Card style={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>
        <Box id="experience" style={{ display: 'block', alignItems: 'center', backgroundColor: themes[theme][colorIndex].background, padding: '2%' }}>
          <Typography variant="h4" style={{ color: themes[theme][colorIndex].text }}>
            Experience
          </Typography>
          <br />
          <Typography variant="body1" style={{ color: themes[theme][colorIndex].text }}>
            <strong>Job Title 1</strong>
            <br />
            Company Name 1
            <br />
            Job Description 1
            <br />
            <br />
            <strong>Job Title 2</strong>
            <br />
            Company Name 2
            <br />
            Job Description 2
          </Typography>
        </Box>
      </Card>
      <br/>
      <Card style={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>
        <Box id="education" style={{ display: 'block', alignItems: 'center', backgroundColor: themes[theme][colorIndex].background, padding: '2%' }}>
          <Typography variant="h4" style={{ color: themes[theme][colorIndex].text }}>
            Education
          </Typography>
          <br />
          <Typography variant="body1" style={{ color: themes[theme][colorIndex].text }}>
            <strong>Degree 1</strong>
            <br />
            School Name 1
            <br />
            Education Description 1
            <br />
            <br />
            <strong>Degree 2</strong>
            <br />
            School Name 2
            <br />
            Education Description 2
          </Typography>
        </Box>
      </Card>
      <Divider variant="middle" style={{ backgroundColor: themes[theme][colorIndex].text }} />
      <br />
      <Card style={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>
      <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {reposData.length > 0 ? (
                    reposData.map(repo => (
                        <Card 
                            key={repo.name} 
                            style={{ 
                                backgroundColor: '#f0f0f0', 
                                color: '#000', 
                                padding: '16px', 
                                width: '200px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
                                display: 'flex', 
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={() => window.open(repo.html_url, '_blank')}
                                style={{ width: '100%' }}
                            >
                                {repo.name}
                            </Button>
                        </Card>
                    ))
                ) : (
                    <Typography variant="body2">No repositories found.</Typography>
                )}
            </Box>
      </Card>
      <Divider variant="middle" style={{ backgroundColor: themes[theme][colorIndex].text }} />
      <br />
      <Card style={{ backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}>
        <Box id="contactus" style={{ display: 'block', alignItems: 'center', backgroundColor: themes[theme][colorIndex].background, padding: '2%' }}>
          <Typography variant="h4" style={{ color: themes[theme][colorIndex].text }}>
            Add a Comment
          </Typography>
          <br />
          <TextField
            label="Add a comment"
            multiline
            rows={4}
            variant="outlined"
            value={commentText}
            onChange={handleCommentChange}
            style={{ width: '100%', backgroundColor: themes[theme][colorIndex].background, color: themes[theme][colorIndex].text }}
          />
          <Button onClick={handleCommentSubmit} style={{ marginTop: '10px', backgroundColor: themes[theme][colorIndex].text, color: themes[theme][colorIndex].background }}>
            Submit
          </Button>
          <List>
            {comments.map((comment, index) => (
              <ListItem key={index}>
                <ListItemText primary={comment} style={{ color: themes[theme][colorIndex].text }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Card>
    </div>
  );
}
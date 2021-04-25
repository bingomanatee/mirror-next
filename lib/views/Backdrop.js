import { useState, useEffect } from 'react';
import styled from 'styled-components';

const COLOR_1 = 'rgb(47,156,119)';
const COLOR_2 = 'rgb(91,189,155)';
const COLOR_3 = 'rgb(113,237,208)';
const COLOR_4 = 'rgb(179,254,245)';

const STOP_1 = ' 00%';
const STOP_2 = ' 5%';
const STOP_3 = ' 30%';
const STOP_4 = ' 100%';

const series = [COLOR_1 + STOP_1, COLOR_2 + STOP_2, COLOR_3 + STOP_3, COLOR_4 + STOP_4]

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: rgba(169, 205, 183, 1.0);
  background: -webkit-linear-gradient(bottom, ${series.join(', ')});
  background: -moz-linear-gradient(bottom, ${series.join(', ')});
  background: linear-gradient(to top, ${series.join(', ')});
`


const Backdrop = ({children}) => (<Wrapper>
  {children}
</Wrapper>)

export default Backdrop

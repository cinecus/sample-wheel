import React, { useEffect, useState, useRef } from "react";
import { useTransition, animated } from "@react-spring/web";
import { render_data, name_data } from "../data/data";
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi'
import _ from 'lodash'


import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [rows, set] = useState(render_data);
  const [status, setStatus] = useState(false)
  const [random, setRandom] = useState([...name_data])
  const [lock, setLock] = useState(name_data[0])
  const [spin, setSpin] = useState(false)
  const counter = useRef(0);

  let height = 0;
  const transitions = useTransition(
    rows.map((data) => ({ ...data, y: (height += data.height) - data.height })),
    {
      key: (item) => item.name,
      from: { opacity: 1, transform: "scale(0.8)" },
      leave: { opacity: 1 },
      enter: ({ y, height }) => ({
        y,
        height,
        opacity: 1,
        transform: "scale(1)"
      }),
      update: ({ y, height }) => ({ y, height })
    }
  );

  const sort_custom = (array) => {
    const first = array.shift();
    array.push(first);
    return array;
  };
  useEffect(() => {
    if (spin) {
      // console.log('counter', counter)
      const t1 = setInterval(() => {
        setRandom([..._.shuffle(name_data).slice(0, 7)])
      }, 100)
      const t = setInterval(() => set([...sort_custom(render_data)]), 100);
      return () => { clearInterval(t); clearInterval(t1) }
    } else {
      if (status) {
        setTimeout(() => {

          alert(`ยินดีด้วยกับคุณ ${counter.current.children[3].innerText} ได้รับรางวัล `)
        }, 500)

        console.log('counter', counter.current.children[3].innerText)
      }
    }

  }, [spin]);

  return (
    <div className={styles.wrapper} >

      <div style={{ 'display': 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{}}>
          <BiRightArrow size={60} />
        </div>
        <div className={styles.list} style={{ height }} ref={counter}>
          {transitions((style, item, t, index) => (
            <animated.div
              className={styles.card}
              style={{ zIndex: rows.length - index, ...style }}

            >
              <div className={styles.cell}>
                <div
                  className={styles.details}
                  style={{ backgroundImage: item.css }}

                >{item.index === 3 ? 'test' : random[item.index]}</div>
              </div>
            </animated.div>
          ))}
        </div>


        <div style={{}}>
          <BiLeftArrow size={60} />
        </div>
      </div>
      <div style={{ 'display': 'flex', 'justifyContent': 'center', marginTop: '50px' }}>

        <button onClick={() => { setSpin(!spin); setStatus(true) }} style={{ 'width': '150px', height: '100px', borderRadius: '10px', 'background': 'blue', 'color': '#fff' }}>Spin</button>
      </div>
    </div>
  )
}

import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { Flex, Heading, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function Home() {
  const [animate, setAnimate] = useState(false);

  let mouse = 0,
    timer = 0,
    timeout = 0,
    average = 0,
    count = 0,
    interpretation = [
      "Превосходно! Можно садиться за штурвал истребителя или болида формулы 1",
      "Это пять с плюсом! Чемпионы мира по пинг-понгу и боксу смотрят на Вас как на конкурента",
      "Великолепно! Мастера спорта международного класса одобряют",
      "Хорошо! Мастер спорта у Вас в кармане",
      "Неплохо. КМС зачтен",
      "Нормально. Вы активны, можете лучше",
      "Средненько. Скорость реакции, как и у большинства людей",
      "Неуд",
      "Незачет",
      "Вы вообще живы там? Лучше отдохните, попробуйте завтра",
    ],
    results = (e) =>
      interpretation[
        [150, 170, 190, 200, 210, 230, 270, 350, 500, Infinity].findIndex(
          (i) => e <= i
        )
      ],
    ending = (e) =>
      ["попытку", "попытки", "попыток"][
        e % 100 > 4 && e % 100 < 20
          ? 2
          : [2, 0, 1, 1, 1, 2][e % 10 < 5 ? e % 10 : 5]
      ],
    react = () => {
      if (animate === true) {
        if (timer > 0) {
          timer = performance.now() - timer;
          average += timer;
          document.body.style.cssText = "";
          document.body.innerHTML =
            timer.toFixed(3) +
            " мс<p>" +
            results(timer) +
            ".<br><br>Среднее время за " +
            ++count +
            " " +
            ending(count) +
            ": " +
            (average / count).toFixed() +
            " мс</p>";

          timer = mouse = 0;
        } else if (mouse == 1) {
          clearTimeout(timeout);
          document.body.textContent = "Слишком рано 😓";

          timer = mouse = 0;
        } else {
          mouse = 1;
          document.body.textContent = "Ждите зеленый 🟢";
          timeout = setTimeout(() => {
            timer = performance.now();
            document.body.style.background =
              "linear-gradient(#2F855A, #276749)";
          }, Math.floor([750, 1500, 2250][count % 3] + Math.random() * 1000));
        }
      }
    };

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 4000);
    document.addEventListener("keydown", react);
    document.addEventListener("mousedown", react);
  }, [react]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Reaction test</title>
        <link rel="canonical" href="https://alexandrsa.web.app/" />
        <meta charset="utf-8" />
        <meta
          name="description"
          content="Reaction test. Try yourself, find out your reaction speed"
        />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack
        justify={"center"}
        align={"center"}
        textAlign={"center"}
        w={"full"}
        overflow={"hidden"}
        minH={"90vh"}
      >
        <main className={styles.main}>
          {animate === !false ? (
            <AT>
              <Heading>Нажмите любую кнопку🙏</Heading>
            </AT>
          ) : (
            <OP>
              <Flex justify={"center"} align={"center"}>
                <AJ>
                  <Heading>ALexandersa</Heading>
                </AJ>
                <AT>
                  <P1>
                    <Heading fontSize={40}>🤜</Heading>
                  </P1>
                </AT>
                <AT>
                  <P2>
                    <Heading fontSize={40}>🤛</Heading>
                  </P2>
                </AT>
              </Flex>
            </OP>
          )}
        </main>
      </Stack>
    </div>
  );
}

function AT({ children }) {
  const A = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };
  return (
    <motion.section initial="hidden" whileInView="visible">
      <motion.div variants={A} transition={{ delay: 0.8 }}>
        {children}
      </motion.div>
    </motion.section>
  );
}

function P1({ children }) {
  const A = {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  };
  return (
    <motion.section initial="hidden" whileInView="visible">
      <motion.div variants={A} transition={{ delay: 0.8 }}>
        {children}
      </motion.div>
    </motion.section>
  );
}

function P2({ children }) {
  const A = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  };
  return (
    <motion.section initial="hidden" whileInView="visible">
      <motion.div
        transition={{ type: "spring", damping: 9, mass: 0.9, delay: 0.8 }}
        variants={A}
        animate={{ rotate: -10 }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}

function AJ({ children }) {
  const A = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };
  return (
    <>
      <motion.section initial="hidden" whileInView="visible">
        <motion.div variants={A} transition={{ delay: 0.3 }}>
          {children}
        </motion.div>
      </motion.section>
    </>
  );
}

function OP({ children }) {
  const A = {
    visible: {
      opacity: 0,
    },
    hidden: {
      opacity: 1,
    },
  };
  return (
    <motion.section initial="hidden" whileInView="visible">
      <motion.div variants={A} transition={{ delay: 3 }}>
        {children}
      </motion.div>
    </motion.section>
  );
}

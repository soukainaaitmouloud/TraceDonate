import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

function HomePage({
  goToAuth,
}) {

  const [
    donations,
    setDonations,
  ] = useState(0);

  const [
    people,
    setPeople,
  ] = useState(0);

  /* ======================================== */
  /* COUNTERS */
  /* ======================================== */

  useEffect(() => {

    const donationTarget =
      12600;

    const peopleTarget =
      320;

    const interval =
      setInterval(() => {

        setDonations(
          (prev) =>
            Math.min(
              prev + 50,
              donationTarget
            )
        );

        setPeople(
          (prev) =>
            Math.min(
              prev + 1,
              peopleTarget
            )
        );

      }, 20);

    return () =>
      clearInterval(
        interval
      );

  }, []);

  return (

    <div style={page}>

      {/* ======================================== */}
      {/* FLOATING BACKGROUND */}
      {/* ======================================== */}

      <div style={bgGlow1} />

      <div style={bgGlow2} />

      <div style={bgGrid} />

      {/* ======================================== */}
      {/* HERO */}
      {/* ======================================== */}

      <section style={hero}>

        {/* VIDEO */}

        <video
          autoPlay
          muted
          loop
          playsInline
          style={videoBg}
        >

          <source
            src="/video.mp4"
            type="video/mp4"
          />

        </video>

        {/* OVERLAY */}

        <div style={overlay} />

        {/* FLOATING ORBS */}

        <motion.div
          style={orb1}
          animate={{
            y: [
              0,
              -40,
              0,
            ],
          }}
          transition={{
            duration: 8,
            repeat:
              Infinity,
          }}
        />

        <motion.div
          style={orb2}
          animate={{
            y: [
              0,
              40,
              0,
            ],
          }}
          transition={{
            duration: 10,
            repeat:
              Infinity,
          }}
        />

        {/* CONTENT */}

        <motion.div
          style={heroContent}
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
        >

          {/* BADGE */}

          <motion.div
            style={badge}
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
          >

            ✨ Trusted Transparent Donations

          </motion.div>

          {/* LOGO */}

       <motion.img
            src="/logo.png"
            alt="logo"
            style={logo}
            initial={{
              scale: 0.7,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
            }}
           
          />

          {/* TITLE */}

          <motion.h1
            style={title}
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
            }}
          >

            Transparent Giving
            <br />
            Starts Here

          </motion.h1>

          {/* SUBTITLE */}

          <motion.p
            style={subtitle}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.6,
            }}
          >

            Track every donation.
            Build trust.
            Change lives.

          </motion.p>

          {/* BUTTONS */}

          <div style={buttonRow}>

            <motion.button
              style={
                primaryBtn
              }
              whileHover={{
                scale: 1.08,
                y: -4,
              }}
              whileTap={{
                scale: 0.96,
              }}
              onClick={() =>
                goToAuth(
                  "donor"
                )
              }
            >

              💚 Donate Now

            </motion.button>

            <motion.button
              style={
                secondaryBtn
              }
              whileHover={{
                scale: 1.08,
                y: -4,
              }}
              whileTap={{
                scale: 0.96,
              }}
              onClick={() =>
                goToAuth(
                  "needy"
                )
              }
            >

              💙 Request Help

            </motion.button>

          </div>

        </motion.div>

      </section>

      {/* ======================================== */}
      {/* IMPACT */}
      {/* ======================================== */}

      <section style={impactSection}>

        <motion.h2
          style={
            sectionTitle
          }
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
        >

          Real Impact

        </motion.h2>

        <div style={impactGrid}>

          {/* CARD */}

          <motion.div
            style={impactCard}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
          >

            <div style={cardGlow} />

            <h1>

              $
              {donations.toLocaleString()}

            </h1>

            <p>

              Total Donations

            </p>

          </motion.div>

          {/* CARD */}

          <motion.div
            style={impactCard}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
          >

            <div style={cardGlow} />

            <h1>

              {people}+

            </h1>

            <p>

              People Helped

            </p>

          </motion.div>

        </div>

      </section>

      {/* ======================================== */}
      {/* STORY */}
      {/* ======================================== */}

      <section style={storySection}>

        <motion.div
          style={storyCard}
          whileHover={{
            y: -8,
          }}
        >

          <h2>

            Every Donation
            Has a Story

          </h2>

          <p>

            Your support can
            transform lives with
            complete transparency
            and trust.

          </p>

        </motion.div>

      </section>

      {/* ======================================== */}
      {/* CTA */}
      {/* ======================================== */}

      <section style={ctaSection}>

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
        >

          <h2 style={ctaTitle}>

            Join The Future
            Of Giving

          </h2>

          <motion.button
            style={ctaBtn}
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() =>
              goToAuth(
                "register"
              )
            }
          >

            🚀 Join TraceDonate

          </motion.button>

        </motion.div>

      </section>

    </div>

  );

}

/* ======================================== */
/* STYLES */
/* ======================================== */

const page = {

  fontFamily:
    "'Inter', sans-serif",

  overflowX:
    "hidden",

  background:
    "#020617",

  position:
    "relative",

  color: "white",

};

const bgGlow1 = {

  position:
    "fixed",

  top: "-200px",

  left: "-200px",

  width: "500px",

  height: "500px",

  borderRadius:
    "50%",

  background:
    "rgba(37,99,235,0.25)",

  filter:
    "blur(120px)",

  zIndex: 0,

};

const bgGlow2 = {

  position:
    "fixed",

  bottom: "-250px",

  right: "-250px",

  width: "600px",

  height: "600px",

  borderRadius:
    "50%",

  background:
    "rgba(34,197,94,0.22)",

  filter:
    "blur(140px)",

  zIndex: 0,

};

const bgGrid = {

  position:
    "fixed",

  inset: 0,

  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",

  backgroundSize:
    "60px 60px",

  zIndex: 0,

};

const hero = {

  height: "100vh",

  position:
    "relative",

  display: "flex",

  justifyContent:
    "center",

  alignItems:
    "center",

  textAlign:
    "center",

  overflow:
    "hidden",

};

const videoBg = {

  position:
    "absolute",

  width: "100%",

  height: "100%",

  objectFit:
    "cover",

};

const overlay = {

  position:
    "absolute",

  inset: 0,

  background:
    "linear-gradient(to bottom, rgba(2,6,23,0.85), rgba(2,6,23,0.6))",

};

const orb1 = {

  position:
    "absolute",

  width: "300px",

  height: "300px",

  borderRadius:
    "50%",

  background:
    "rgba(37,99,235,0.25)",

  filter:
    "blur(60px)",

  top: "10%",

  left: "10%",

};

const orb2 = {

  position:
    "absolute",

  width: "300px",

  height: "300px",

  borderRadius:
    "50%",

  background:
    "rgba(34,197,94,0.2)",

  filter:
    "blur(60px)",

  bottom: "10%",

  right: "10%",

};

const heroContent = {

  position:
    "relative",

  zIndex: 2,

  maxWidth:
    "900px",

  padding:
    "0 20px",

};

const badge = {

  display:
    "inline-block",

  padding:
    "12px 24px",

  borderRadius:
    "999px",

  background:
    "rgba(255,255,255,0.08)",

  border:
    "1px solid rgba(255,255,255,0.15)",

  backdropFilter:
    "blur(10px)",

  marginBottom:
    "30px",

  fontWeight:
    "600",

};
const logo = {

  width: "340px",

  marginBottom: "20px",

  marginLeft: "250px",

  marginTop: "-20px",

  filter:
    "drop-shadow(0 0 40px rgba(34,197,94,0.7))",

};
const title = {

  fontSize:
    "clamp(42px, 7vw, 92px)",

  fontWeight:
    "900",

  lineHeight:
    "1.05",

  marginBottom:
    "24px",

};

const subtitle = {

  fontSize:
    "clamp(20px,2vw,26px)",

  opacity: 0.9,

  marginBottom:
    "40px",

};

const buttonRow = {

  display: "flex",

  gap: "20px",

  justifyContent:
    "center",

  flexWrap:
    "wrap",

};

const primaryBtn = {

  padding:
    "18px 42px",

  borderRadius:
    "999px",

  border: "none",

  background:
    "linear-gradient(135deg,#22c55e,#2563eb)",

  color: "white",

  fontWeight:
    "800",

  fontSize:
    "18px",

  cursor:
    "pointer",

  boxShadow:
    "0 20px 50px rgba(37,99,235,0.35)",

};

const secondaryBtn = {

  padding:
    "18px 42px",

  borderRadius:
    "999px",

  border:
    "1px solid rgba(255,255,255,0.2)",

  background:
    "rgba(255,255,255,0.08)",

  backdropFilter:
    "blur(10px)",

  color: "white",

  fontWeight:
    "800",

  fontSize:
    "18px",

  cursor:
    "pointer",

};

const impactSection = {

  padding:
    "140px 20px",

  position:
    "relative",

  zIndex: 2,

};

const sectionTitle = {

  textAlign:
    "center",

  fontSize:
    "56px",

  marginBottom:
    "70px",

};

const impactGrid = {

  display: "flex",

  gap: "40px",

  justifyContent:
    "center",

  flexWrap:
    "wrap",

};

const impactCard = {

  position:
    "relative",

  overflow:
    "hidden",

  width: "320px",

  padding:
    "60px 40px",

  borderRadius:
    "34px",

  background:
    "rgba(255,255,255,0.08)",

  border:
    "1px solid rgba(255,255,255,0.12)",

  backdropFilter:
    "blur(20px)",

  textAlign:
    "center",

};

const cardGlow = {

  position:
    "absolute",

  inset: 0,

  background:
    "linear-gradient(135deg, rgba(255,255,255,0.08), transparent)",

};

const storySection = {

  padding:
    "140px 20px",

  display: "flex",

  justifyContent:
    "center",

};

const storyCard = {

  maxWidth:
    "900px",

  padding:
    "70px",

  borderRadius:
    "40px",

  background:
    "rgba(255,255,255,0.08)",

  border:
    "1px solid rgba(255,255,255,0.12)",

  backdropFilter:
    "blur(20px)",

  textAlign:
    "center",

};

const ctaSection = {

  padding:
    "140px 20px",

  textAlign:
    "center",

};

const ctaTitle = {

  fontSize:
    "72px",

  marginBottom:
    "40px",

};

const ctaBtn = {

  padding:
    "22px 50px",

  borderRadius:
    "999px",

  border: "none",

  background:
    "linear-gradient(135deg,#22c55e,#2563eb)",

  color: "white",

  fontWeight:
    "900",

  fontSize:
    "22px",

  cursor:
    "pointer",

  boxShadow:
    "0 20px 60px rgba(37,99,235,0.4)",

};

export default HomePage;
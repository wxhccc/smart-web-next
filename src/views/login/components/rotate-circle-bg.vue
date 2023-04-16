<template>
  <div class="sw-rotate-circle-container">
    <div class="container">
      <div class="container-rotate">
        <div v-for="i in 200" class="rotate">
          <div class="flip-rotate">
            <div class="flip-pos"><div class="flip"></div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.sw-rotate-circle-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  background: radial-gradient(ellipse at left top, #0cddfd 20%, #019ed7 50%, #0353d3);
  div {
    transform-style: preserve-3d;
  }
  .container {
    perspective: 1600px;
  }

  .container-rotate {
    transform: rotateX(90deg);
  }

  @keyframes rotation {
    0% {
      transform: rotateY(0deg);
    }

    100% {
      transform: rotateY(360deg);
    }
  }
  @keyframes rotate01 {
    0% {
      opacity: 0.6;
    }

    25% {
      opacity: 0.4;
    }

    50% {
      opacity: 0.6;
    }

    100% {
      opacity: 0.4;
    }
  }
  @keyframes rotate02 {
    0% {
      opacity: 0.4;
    }

    25% {
      opacity: 0.1;
    }

    50% {
      opacity: 0.4;
    }

    100% {
      opacity: 0.1;
    }
  }

  /* flip style */
  .flip {
    position: absolute;
    top: -240px;
    width: 1.6vw;
    height: 1.6vw;
    border-radius: 50%;
  }

  .rotate:nth-of-type(1) {
    animation: rotation linear infinite reverse;
    animation-delay: -47506ms;
    animation-duration: 22712ms;
  }

  .rotate:nth-of-type(1) .flip-rotate {
    transform: rotateX(61deg);
  }

  .rotate:nth-of-type(1) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(1) .flip {
    left: calc(30% + 52px);
  }

  .rotate:nth-of-type(2) {
    animation: rotation linear infinite reverse;
    animation-delay: -41743ms;
    animation-duration: 41268ms;
  }

  .rotate:nth-of-type(2) .flip-rotate {
    transform: rotateX(71deg);
  }

  .rotate:nth-of-type(2) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(2) .flip {
    left: calc(30% + 95px);
  }

  .rotate:nth-of-type(3) {
    animation: rotation linear infinite reverse;
    animation-delay: -48537ms;
    animation-duration: 58468ms;
  }

  .rotate:nth-of-type(3) .flip-rotate {
    transform: rotateX(50deg);
  }

  .rotate:nth-of-type(3) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(3) .flip {
    left: calc(30% + 115px);
  }

  .rotate:nth-of-type(4) {
    animation: rotation linear infinite reverse;
    animation-delay: -43982ms;
    animation-duration: 20965ms;
  }

  .rotate:nth-of-type(4) .flip-rotate {
    transform: rotateX(31deg);
  }

  .rotate:nth-of-type(4) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(4) .flip {
    left: calc(30% + 58px);
  }

  .rotate:nth-of-type(5) {
    animation: rotation linear infinite reverse;
    animation-delay: -49631ms;
    animation-duration: 28137ms;
  }

  .rotate:nth-of-type(5) .flip-rotate {
    transform: rotateX(31deg);
  }

  .rotate:nth-of-type(5) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(5) .flip {
    left: calc(30% + 116px);
  }

  .rotate:nth-of-type(6) {
    animation: rotation linear infinite reverse;
    animation-delay: -45155ms;
    animation-duration: 39061ms;
  }

  .rotate:nth-of-type(6) .flip-rotate {
    transform: rotateX(63deg);
  }

  .rotate:nth-of-type(6) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(6) .flip {
    left: calc(30% + 68px);
  }

  .rotate:nth-of-type(7) {
    animation: rotation linear infinite reverse;
    animation-delay: -42960ms;
    animation-duration: 25274ms;
  }

  .rotate:nth-of-type(7) .flip-rotate {
    transform: rotateX(47deg);
  }

  .rotate:nth-of-type(7) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(7) .flip {
    left: calc(30% + 67px);
  }

  .rotate:nth-of-type(8) {
    animation: rotation linear infinite reverse;
    animation-delay: -43461ms;
    animation-duration: 42171ms;
  }

  .rotate:nth-of-type(8) .flip-rotate {
    transform: rotateX(75deg);
  }

  .rotate:nth-of-type(8) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(8) .flip {
    left: calc(30% + 60px);
  }

  .rotate:nth-of-type(9) {
    animation: rotation linear infinite reverse;
    animation-delay: -42357ms;
    animation-duration: 23216ms;
  }

  .rotate:nth-of-type(9) .flip-rotate {
    transform: rotateX(50deg);
  }

  .rotate:nth-of-type(9) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(9) .flip {
    left: calc(30% + 56px);
  }

  .rotate:nth-of-type(10) {
    animation: rotation linear infinite reverse;
    animation-delay: -45110ms;
    animation-duration: 34845ms;
  }

  .rotate:nth-of-type(10) .flip-rotate {
    transform: rotateX(49deg);
  }

  .rotate:nth-of-type(10) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(10) .flip {
    left: calc(30% + 63px);
  }

  .rotate:nth-of-type(11) {
    animation: rotation linear infinite reverse;
    animation-delay: -46515ms;
    animation-duration: 57345ms;
  }

  .rotate:nth-of-type(11) .flip-rotate {
    transform: rotateX(52deg);
  }

  .rotate:nth-of-type(11) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(11) .flip {
    left: calc(30% + 99px);
  }

  .rotate:nth-of-type(12) {
    animation: rotation linear infinite reverse;
    animation-delay: -45561ms;
    animation-duration: 26594ms;
  }

  .rotate:nth-of-type(12) .flip-rotate {
    transform: rotateX(40deg);
  }

  .rotate:nth-of-type(12) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(12) .flip {
    left: calc(30% + 100px);
  }

  .rotate:nth-of-type(13) {
    animation: rotation linear infinite reverse;
    animation-delay: -45427ms;
    animation-duration: 40017ms;
  }

  .rotate:nth-of-type(13) .flip-rotate {
    transform: rotateX(24deg);
  }

  .rotate:nth-of-type(13) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(13) .flip {
    left: calc(30% + 59px);
  }

  .rotate:nth-of-type(14) {
    animation: rotation linear infinite reverse;
    animation-delay: -46060ms;
    animation-duration: 27333ms;
  }

  .rotate:nth-of-type(14) .flip-rotate {
    transform: rotateX(45deg);
  }

  .rotate:nth-of-type(14) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(14) .flip {
    left: calc(30% + 98px);
  }

  .rotate:nth-of-type(15) {
    animation: rotation linear infinite reverse;
    animation-delay: -44920ms;
    animation-duration: 28470ms;
  }

  .rotate:nth-of-type(15) .flip-rotate {
    transform: rotateX(31deg);
  }

  .rotate:nth-of-type(15) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(15) .flip {
    left: calc(30% + 125px);
  }

  .rotate:nth-of-type(16) {
    animation: rotation linear infinite reverse;
    animation-delay: -44347ms;
    animation-duration: 27634ms;
  }

  .rotate:nth-of-type(16) .flip-rotate {
    transform: rotateX(38deg);
  }

  .rotate:nth-of-type(16) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(16) .flip {
    left: calc(30% + 96px);
  }

  .rotate:nth-of-type(17) {
    animation: rotation linear infinite reverse;
    animation-delay: -48297ms;
    animation-duration: 34571ms;
  }

  .rotate:nth-of-type(17) .flip-rotate {
    transform: rotateX(75deg);
  }

  .rotate:nth-of-type(17) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(17) .flip {
    left: calc(30% + 129px);
  }

  .rotate:nth-of-type(18) {
    animation: rotation linear infinite reverse;
    animation-delay: -44102ms;
    animation-duration: 23956ms;
  }

  .rotate:nth-of-type(18) .flip-rotate {
    transform: rotateX(40deg);
  }

  .rotate:nth-of-type(18) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(18) .flip {
    left: calc(30% + 127px);
  }

  .rotate:nth-of-type(19) {
    animation: rotation linear infinite reverse;
    animation-delay: -45803ms;
    animation-duration: 37932ms;
  }

  .rotate:nth-of-type(19) .flip-rotate {
    transform: rotateX(81deg);
  }

  .rotate:nth-of-type(19) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(19) .flip {
    left: calc(30% + 123px);
  }

  .rotate:nth-of-type(20) {
    animation: rotation linear infinite reverse;
    animation-delay: -45161ms;
    animation-duration: 36565ms;
  }

  .rotate:nth-of-type(20) .flip-rotate {
    transform: rotateX(39deg);
  }

  .rotate:nth-of-type(20) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(20) .flip {
    left: calc(30% + 94px);
  }

  .rotate:nth-of-type(21) {
    animation: rotation linear infinite reverse;
    animation-delay: -40749ms;
    animation-duration: 20504ms;
  }

  .rotate:nth-of-type(21) .flip-rotate {
    transform: rotateX(64deg);
  }

  .rotate:nth-of-type(21) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(21) .flip {
    left: calc(30% + 90px);
  }

  .rotate:nth-of-type(22) {
    animation: rotation linear infinite reverse;
    animation-delay: -47393ms;
    animation-duration: 53403ms;
  }

  .rotate:nth-of-type(22) .flip-rotate {
    transform: rotateX(37deg);
  }

  .rotate:nth-of-type(22) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(22) .flip {
    left: calc(30% + 63px);
  }

  .rotate:nth-of-type(23) {
    animation: rotation linear infinite reverse;
    animation-delay: -41881ms;
    animation-duration: 30125ms;
  }

  .rotate:nth-of-type(23) .flip-rotate {
    transform: rotateX(23deg);
  }

  .rotate:nth-of-type(23) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(23) .flip {
    left: calc(30% + 52px);
  }

  .rotate:nth-of-type(24) {
    animation: rotation linear infinite reverse;
    animation-delay: -48170ms;
    animation-duration: 53709ms;
  }

  .rotate:nth-of-type(24) .flip-rotate {
    transform: rotateX(40deg);
  }

  .rotate:nth-of-type(24) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(24) .flip {
    left: calc(30% + 62px);
  }

  .rotate:nth-of-type(25) {
    animation: rotation linear infinite reverse;
    animation-delay: -43221ms;
    animation-duration: 44956ms;
  }

  .rotate:nth-of-type(25) .flip-rotate {
    transform: rotateX(39deg);
  }

  .rotate:nth-of-type(25) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(25) .flip {
    left: calc(30% + 113px);
  }

  .rotate:nth-of-type(26) {
    animation: rotation linear infinite reverse;
    animation-delay: -45124ms;
    animation-duration: 39434ms;
  }

  .rotate:nth-of-type(26) .flip-rotate {
    transform: rotateX(6deg);
  }

  .rotate:nth-of-type(26) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(26) .flip {
    left: calc(30% + 95px);
  }

  .rotate:nth-of-type(27) {
    animation: rotation linear infinite reverse;
    animation-delay: -43261ms;
    animation-duration: 56024ms;
  }

  .rotate:nth-of-type(27) .flip-rotate {
    transform: rotateX(79deg);
  }

  .rotate:nth-of-type(27) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(27) .flip {
    left: calc(30% + 84px);
  }

  .rotate:nth-of-type(28) {
    animation: rotation linear infinite reverse;
    animation-delay: -48104ms;
    animation-duration: 47670ms;
  }

  .rotate:nth-of-type(28) .flip-rotate {
    transform: rotateX(54deg);
  }

  .rotate:nth-of-type(28) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(28) .flip {
    left: calc(30% + 106px);
  }

  .rotate:nth-of-type(29) {
    animation: rotation linear infinite reverse;
    animation-delay: -44967ms;
    animation-duration: 48913ms;
  }

  .rotate:nth-of-type(29) .flip-rotate {
    transform: rotateX(66deg);
  }

  .rotate:nth-of-type(29) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(29) .flip {
    left: calc(30% + 98px);
  }

  .rotate:nth-of-type(30) {
    animation: rotation linear infinite reverse;
    animation-delay: -42994ms;
    animation-duration: 31030ms;
  }

  .rotate:nth-of-type(30) .flip-rotate {
    transform: rotateX(21deg);
  }

  .rotate:nth-of-type(30) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(30) .flip {
    left: calc(30% + 80px);
  }

  .rotate:nth-of-type(31) {
    animation: rotation linear infinite reverse;
    animation-delay: -41376ms;
    animation-duration: 21394ms;
  }

  .rotate:nth-of-type(31) .flip-rotate {
    transform: rotateX(49deg);
  }

  .rotate:nth-of-type(31) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(31) .flip {
    left: calc(30% + 85px);
  }

  .rotate:nth-of-type(32) {
    animation: rotation linear infinite reverse;
    animation-delay: -43976ms;
    animation-duration: 41595ms;
  }

  .rotate:nth-of-type(32) .flip-rotate {
    transform: rotateX(11deg);
  }

  .rotate:nth-of-type(32) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(32) .flip {
    left: calc(30% + 89px);
  }

  .rotate:nth-of-type(33) {
    animation: rotation linear infinite reverse;
    animation-delay: -45370ms;
    animation-duration: 48932ms;
  }

  .rotate:nth-of-type(33) .flip-rotate {
    transform: rotateX(69deg);
  }

  .rotate:nth-of-type(33) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(33) .flip {
    left: calc(30% + 84px);
  }

  .rotate:nth-of-type(34) {
    animation: rotation linear infinite reverse;
    animation-delay: -49197ms;
    animation-duration: 27290ms;
  }

  .rotate:nth-of-type(34) .flip-rotate {
    transform: rotateX(84deg);
  }

  .rotate:nth-of-type(34) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(34) .flip {
    left: calc(30% + 83px);
  }

  .rotate:nth-of-type(35) {
    animation: rotation linear infinite reverse;
    animation-delay: -45081ms;
    animation-duration: 20937ms;
  }

  .rotate:nth-of-type(35) .flip-rotate {
    transform: rotateX(28deg);
  }

  .rotate:nth-of-type(35) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(35) .flip {
    left: calc(30% + 62px);
  }

  .rotate:nth-of-type(36) {
    animation: rotation linear infinite reverse;
    animation-delay: -43777ms;
    animation-duration: 27572ms;
  }

  .rotate:nth-of-type(36) .flip-rotate {
    transform: rotateX(18deg);
  }

  .rotate:nth-of-type(36) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(36) .flip {
    left: calc(30% + 60px);
  }

  .rotate:nth-of-type(37) {
    animation: rotation linear infinite reverse;
    animation-delay: -46921ms;
    animation-duration: 20368ms;
  }

  .rotate:nth-of-type(37) .flip-rotate {
    transform: rotateX(83deg);
  }

  .rotate:nth-of-type(37) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(37) .flip {
    left: calc(30% + 129px);
  }

  .rotate:nth-of-type(38) {
    animation: rotation linear infinite reverse;
    animation-delay: -48181ms;
    animation-duration: 45298ms;
  }

  .rotate:nth-of-type(38) .flip-rotate {
    transform: rotateX(24deg);
  }

  .rotate:nth-of-type(38) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(38) .flip {
    left: calc(30% + 94px);
  }

  .rotate:nth-of-type(39) {
    animation: rotation linear infinite reverse;
    animation-delay: -46299ms;
    animation-duration: 46037ms;
  }

  .rotate:nth-of-type(39) .flip-rotate {
    transform: rotateX(37deg);
  }

  .rotate:nth-of-type(39) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(39) .flip {
    left: calc(30% + 69px);
  }

  .rotate:nth-of-type(40) {
    animation: rotation linear infinite reverse;
    animation-delay: -49968ms;
    animation-duration: 23013ms;
  }

  .rotate:nth-of-type(40) .flip-rotate {
    transform: rotateX(18deg);
  }

  .rotate:nth-of-type(40) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(40) .flip {
    left: calc(30% + 118px);
  }

  .rotate:nth-of-type(41) {
    animation: rotation linear infinite reverse;
    animation-delay: -49913ms;
    animation-duration: 53981ms;
  }

  .rotate:nth-of-type(41) .flip-rotate {
    transform: rotateX(34deg);
  }

  .rotate:nth-of-type(41) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(41) .flip {
    left: calc(30% + 121px);
  }

  .rotate:nth-of-type(42) {
    animation: rotation linear infinite reverse;
    animation-delay: -46389ms;
    animation-duration: 34088ms;
  }

  .rotate:nth-of-type(42) .flip-rotate {
    transform: rotateX(20deg);
  }

  .rotate:nth-of-type(42) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(42) .flip {
    left: calc(30% + 59px);
  }

  .rotate:nth-of-type(43) {
    animation: rotation linear infinite reverse;
    animation-delay: -45026ms;
    animation-duration: 36118ms;
  }

  .rotate:nth-of-type(43) .flip-rotate {
    transform: rotateX(34deg);
  }

  .rotate:nth-of-type(43) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(43) .flip {
    left: calc(30% + 118px);
  }

  .rotate:nth-of-type(44) {
    animation: rotation linear infinite reverse;
    animation-delay: -47067ms;
    animation-duration: 46214ms;
  }

  .rotate:nth-of-type(44) .flip-rotate {
    transform: rotateX(1deg);
  }

  .rotate:nth-of-type(44) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(44) .flip {
    left: calc(30% + 112px);
  }

  .rotate:nth-of-type(45) {
    animation: rotation linear infinite reverse;
    animation-delay: -41813ms;
    animation-duration: 43029ms;
  }

  .rotate:nth-of-type(45) .flip-rotate {
    transform: rotateX(4deg);
  }

  .rotate:nth-of-type(45) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(45) .flip {
    left: calc(30% + 99px);
  }

  .rotate:nth-of-type(46) {
    animation: rotation linear infinite reverse;
    animation-delay: -46618ms;
    animation-duration: 47323ms;
  }

  .rotate:nth-of-type(46) .flip-rotate {
    transform: rotateX(41deg);
  }

  .rotate:nth-of-type(46) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(46) .flip {
    left: calc(30% + 103px);
  }

  .rotate:nth-of-type(47) {
    animation: rotation linear infinite reverse;
    animation-delay: -40083ms;
    animation-duration: 58620ms;
  }

  .rotate:nth-of-type(47) .flip-rotate {
    transform: rotateX(42deg);
  }

  .rotate:nth-of-type(47) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(47) .flip {
    left: calc(30% + 62px);
  }

  .rotate:nth-of-type(48) {
    animation: rotation linear infinite reverse;
    animation-delay: -47064ms;
    animation-duration: 49884ms;
  }

  .rotate:nth-of-type(48) .flip-rotate {
    transform: rotateX(24deg);
  }

  .rotate:nth-of-type(48) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(48) .flip {
    left: calc(30% + 85px);
  }

  .rotate:nth-of-type(49) {
    animation: rotation linear infinite reverse;
    animation-delay: -48066ms;
    animation-duration: 39075ms;
  }

  .rotate:nth-of-type(49) .flip-rotate {
    transform: rotateX(29deg);
  }

  .rotate:nth-of-type(49) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(49) .flip {
    left: calc(30% + 69px);
  }

  .rotate:nth-of-type(50) {
    animation: rotation linear infinite reverse;
    animation-delay: -40392ms;
    animation-duration: 49853ms;
  }

  .rotate:nth-of-type(50) .flip-rotate {
    transform: rotateX(46deg);
  }

  .rotate:nth-of-type(50) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(50) .flip {
    left: calc(30% + 74px);
  }

  .rotate:nth-of-type(51) {
    animation: rotation linear infinite reverse;
    animation-delay: -47581ms;
    animation-duration: 28043ms;
  }

  .rotate:nth-of-type(51) .flip-rotate {
    transform: rotateX(52deg);
  }

  .rotate:nth-of-type(51) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(51) .flip {
    left: calc(30% + 117px);
  }

  .rotate:nth-of-type(52) {
    animation: rotation linear infinite reverse;
    animation-delay: -48512ms;
    animation-duration: 28274ms;
  }

  .rotate:nth-of-type(52) .flip-rotate {
    transform: rotateX(63deg);
  }

  .rotate:nth-of-type(52) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(52) .flip {
    left: calc(30% + 66px);
  }

  .rotate:nth-of-type(53) {
    animation: rotation linear infinite reverse;
    animation-delay: -40118ms;
    animation-duration: 48481ms;
  }

  .rotate:nth-of-type(53) .flip-rotate {
    transform: rotateX(61deg);
  }

  .rotate:nth-of-type(53) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(53) .flip {
    left: calc(30% + 97px);
  }

  .rotate:nth-of-type(54) {
    animation: rotation linear infinite reverse;
    animation-delay: -44675ms;
    animation-duration: 34478ms;
  }

  .rotate:nth-of-type(54) .flip-rotate {
    transform: rotateX(9deg);
  }

  .rotate:nth-of-type(54) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(54) .flip {
    left: calc(30% + 100px);
  }

  .rotate:nth-of-type(55) {
    animation: rotation linear infinite reverse;
    animation-delay: -49453ms;
    animation-duration: 41966ms;
  }

  .rotate:nth-of-type(55) .flip-rotate {
    transform: rotateX(20deg);
  }

  .rotate:nth-of-type(55) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(55) .flip {
    left: calc(30% + 104px);
  }

  .rotate:nth-of-type(56) {
    animation: rotation linear infinite reverse;
    animation-delay: -46555ms;
    animation-duration: 33585ms;
  }

  .rotate:nth-of-type(56) .flip-rotate {
    transform: rotateX(30deg);
  }

  .rotate:nth-of-type(56) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(56) .flip {
    left: calc(30% + 51px);
  }

  .rotate:nth-of-type(57) {
    animation: rotation linear infinite reverse;
    animation-delay: -45371ms;
    animation-duration: 51296ms;
  }

  .rotate:nth-of-type(57) .flip-rotate {
    transform: rotateX(30deg);
  }

  .rotate:nth-of-type(57) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(57) .flip {
    left: calc(30% + 125px);
  }

  .rotate:nth-of-type(58) {
    animation: rotation linear infinite reverse;
    animation-delay: -47755ms;
    animation-duration: 32284ms;
  }

  .rotate:nth-of-type(58) .flip-rotate {
    transform: rotateX(45deg);
  }

  .rotate:nth-of-type(58) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(58) .flip {
    left: calc(30% + 56px);
  }

  .rotate:nth-of-type(59) {
    animation: rotation linear infinite reverse;
    animation-delay: -40156ms;
    animation-duration: 46222ms;
  }

  .rotate:nth-of-type(59) .flip-rotate {
    transform: rotateX(10deg);
  }

  .rotate:nth-of-type(59) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(59) .flip {
    left: calc(30% + 90px);
  }

  .rotate:nth-of-type(60) {
    animation: rotation linear infinite reverse;
    animation-delay: -45223ms;
    animation-duration: 21437ms;
  }

  .rotate:nth-of-type(60) .flip-rotate {
    transform: rotateX(57deg);
  }

  .rotate:nth-of-type(60) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(60) .flip {
    left: calc(30% + 51px);
  }

  .rotate:nth-of-type(61) {
    animation: rotation linear infinite reverse;
    animation-delay: -48490ms;
    animation-duration: 40517ms;
  }

  .rotate:nth-of-type(61) .flip-rotate {
    transform: rotateX(35deg);
  }

  .rotate:nth-of-type(61) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(61) .flip {
    left: calc(30% + 103px);
  }

  .rotate:nth-of-type(62) {
    animation: rotation linear infinite reverse;
    animation-delay: -41627ms;
    animation-duration: 38455ms;
  }

  .rotate:nth-of-type(62) .flip-rotate {
    transform: rotateX(9deg);
  }

  .rotate:nth-of-type(62) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(62) .flip {
    left: calc(30% + 91px);
  }

  .rotate:nth-of-type(63) {
    animation: rotation linear infinite reverse;
    animation-delay: -42142ms;
    animation-duration: 48533ms;
  }

  .rotate:nth-of-type(63) .flip-rotate {
    transform: rotateX(57deg);
  }

  .rotate:nth-of-type(63) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(63) .flip {
    left: calc(30% + 117px);
  }

  .rotate:nth-of-type(64) {
    animation: rotation linear infinite reverse;
    animation-delay: -49859ms;
    animation-duration: 43436ms;
  }

  .rotate:nth-of-type(64) .flip-rotate {
    transform: rotateX(51deg);
  }

  .rotate:nth-of-type(64) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(64) .flip {
    left: calc(30% + 119px);
  }

  .rotate:nth-of-type(65) {
    animation: rotation linear infinite reverse;
    animation-delay: -42292ms;
    animation-duration: 20237ms;
  }

  .rotate:nth-of-type(65) .flip-rotate {
    transform: rotateX(2deg);
  }

  .rotate:nth-of-type(65) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(65) .flip {
    left: calc(30% + 80px);
  }

  .rotate:nth-of-type(66) {
    animation: rotation linear infinite reverse;
    animation-delay: -47810ms;
    animation-duration: 47086ms;
  }

  .rotate:nth-of-type(66) .flip-rotate {
    transform: rotateX(59deg);
  }

  .rotate:nth-of-type(66) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(66) .flip {
    left: calc(30% + 121px);
  }

  .rotate:nth-of-type(67) {
    animation: rotation linear infinite reverse;
    animation-delay: -42405ms;
    animation-duration: 43673ms;
  }

  .rotate:nth-of-type(67) .flip-rotate {
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(67) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(67) .flip {
    left: calc(30% + 70px);
  }

  .rotate:nth-of-type(68) {
    animation: rotation linear infinite reverse;
    animation-delay: -43685ms;
    animation-duration: 37474ms;
  }

  .rotate:nth-of-type(68) .flip-rotate {
    transform: rotateX(69deg);
  }

  .rotate:nth-of-type(68) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(68) .flip {
    left: calc(30% + 51px);
  }

  .rotate:nth-of-type(69) {
    animation: rotation linear infinite reverse;
    animation-delay: -42023ms;
    animation-duration: 28174ms;
  }

  .rotate:nth-of-type(69) .flip-rotate {
    transform: rotateX(18deg);
  }

  .rotate:nth-of-type(69) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(69) .flip {
    left: calc(30% + 60px);
  }

  .rotate:nth-of-type(70) {
    animation: rotation linear infinite reverse;
    animation-delay: -44818ms;
    animation-duration: 29915ms;
  }

  .rotate:nth-of-type(70) .flip-rotate {
    transform: rotateX(52deg);
  }

  .rotate:nth-of-type(70) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(70) .flip {
    left: calc(30% + 89px);
  }

  .rotate:nth-of-type(71) {
    animation: rotation linear infinite reverse;
    animation-delay: -40663ms;
    animation-duration: 22412ms;
  }

  .rotate:nth-of-type(71) .flip-rotate {
    transform: rotateX(73deg);
  }

  .rotate:nth-of-type(71) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(71) .flip {
    left: calc(30% + 90px);
  }

  .rotate:nth-of-type(72) {
    animation: rotation linear infinite reverse;
    animation-delay: -41508ms;
    animation-duration: 22832ms;
  }

  .rotate:nth-of-type(72) .flip-rotate {
    transform: rotateX(76deg);
  }

  .rotate:nth-of-type(72) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(72) .flip {
    left: calc(30% + 94px);
  }

  .rotate:nth-of-type(73) {
    animation: rotation linear infinite reverse;
    animation-delay: -48782ms;
    animation-duration: 48549ms;
  }

  .rotate:nth-of-type(73) .flip-rotate {
    transform: rotateX(55deg);
  }

  .rotate:nth-of-type(73) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(73) .flip {
    left: calc(30% + 102px);
  }

  .rotate:nth-of-type(74) {
    animation: rotation linear infinite reverse;
    animation-delay: -40217ms;
    animation-duration: 55776ms;
  }

  .rotate:nth-of-type(74) .flip-rotate {
    transform: rotateX(18deg);
  }

  .rotate:nth-of-type(74) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(74) .flip {
    left: calc(30% + 87px);
  }

  .rotate:nth-of-type(75) {
    animation: rotation linear infinite reverse;
    animation-delay: -40564ms;
    animation-duration: 29173ms;
  }

  .rotate:nth-of-type(75) .flip-rotate {
    transform: rotateX(3deg);
  }

  .rotate:nth-of-type(75) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(75) .flip {
    left: calc(30% + 95px);
  }

  .rotate:nth-of-type(76) {
    animation: rotation linear infinite reverse;
    animation-delay: -45193ms;
    animation-duration: 28892ms;
  }

  .rotate:nth-of-type(76) .flip-rotate {
    transform: rotateX(14deg);
  }

  .rotate:nth-of-type(76) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(76) .flip {
    left: calc(30% + 63px);
  }

  .rotate:nth-of-type(77) {
    animation: rotation linear infinite reverse;
    animation-delay: -48998ms;
    animation-duration: 32849ms;
  }

  .rotate:nth-of-type(77) .flip-rotate {
    transform: rotateX(21deg);
  }

  .rotate:nth-of-type(77) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(77) .flip {
    left: calc(30% + 106px);
  }

  .rotate:nth-of-type(78) {
    animation: rotation linear infinite reverse;
    animation-delay: -41241ms;
    animation-duration: 30713ms;
  }

  .rotate:nth-of-type(78) .flip-rotate {
    transform: rotateX(72deg);
  }

  .rotate:nth-of-type(78) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(78) .flip {
    left: calc(30% + 100px);
  }

  .rotate:nth-of-type(79) {
    animation: rotation linear infinite reverse;
    animation-delay: -47169ms;
    animation-duration: 40402ms;
  }

  .rotate:nth-of-type(79) .flip-rotate {
    transform: rotateX(34deg);
  }

  .rotate:nth-of-type(79) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(79) .flip {
    left: calc(30% + 100px);
  }

  .rotate:nth-of-type(80) {
    animation: rotation linear infinite reverse;
    animation-delay: -49466ms;
    animation-duration: 40999ms;
  }

  .rotate:nth-of-type(80) .flip-rotate {
    transform: rotateX(84deg);
  }

  .rotate:nth-of-type(80) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(80) .flip {
    left: calc(30% + 73px);
  }

  .rotate:nth-of-type(81) {
    animation: rotation linear infinite reverse;
    animation-delay: -43887ms;
    animation-duration: 47984ms;
  }

  .rotate:nth-of-type(81) .flip-rotate {
    transform: rotateX(41deg);
  }

  .rotate:nth-of-type(81) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(81) .flip {
    left: calc(30% + 76px);
  }

  .rotate:nth-of-type(82) {
    animation: rotation linear infinite reverse;
    animation-delay: -47113ms;
    animation-duration: 51561ms;
  }

  .rotate:nth-of-type(82) .flip-rotate {
    transform: rotateX(15deg);
  }

  .rotate:nth-of-type(82) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(82) .flip {
    left: calc(30% + 71px);
  }

  .rotate:nth-of-type(83) {
    animation: rotation linear infinite reverse;
    animation-delay: -48924ms;
    animation-duration: 32271ms;
  }

  .rotate:nth-of-type(83) .flip-rotate {
    transform: rotateX(57deg);
  }

  .rotate:nth-of-type(83) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(83) .flip {
    left: calc(30% + 100px);
  }

  .rotate:nth-of-type(84) {
    animation: rotation linear infinite reverse;
    animation-delay: -40451ms;
    animation-duration: 47395ms;
  }

  .rotate:nth-of-type(84) .flip-rotate {
    transform: rotateX(29deg);
  }

  .rotate:nth-of-type(84) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(84) .flip {
    left: calc(30% + 119px);
  }

  .rotate:nth-of-type(85) {
    animation: rotation linear infinite reverse;
    animation-delay: -47605ms;
    animation-duration: 32563ms;
  }

  .rotate:nth-of-type(85) .flip-rotate {
    transform: rotateX(18deg);
  }

  .rotate:nth-of-type(85) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(85) .flip {
    left: calc(30% + 94px);
  }

  .rotate:nth-of-type(86) {
    animation: rotation linear infinite reverse;
    animation-delay: -46533ms;
    animation-duration: 39685ms;
  }

  .rotate:nth-of-type(86) .flip-rotate {
    transform: rotateX(47deg);
  }

  .rotate:nth-of-type(86) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(86) .flip {
    left: calc(30% + 92px);
  }

  .rotate:nth-of-type(87) {
    animation: rotation linear infinite reverse;
    animation-delay: -44594ms;
    animation-duration: 39729ms;
  }

  .rotate:nth-of-type(87) .flip-rotate {
    transform: rotateX(57deg);
  }

  .rotate:nth-of-type(87) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(87) .flip {
    left: calc(30% + 91px);
  }

  .rotate:nth-of-type(88) {
    animation: rotation linear infinite reverse;
    animation-delay: -41195ms;
    animation-duration: 27310ms;
  }

  .rotate:nth-of-type(88) .flip-rotate {
    transform: rotateX(54deg);
  }

  .rotate:nth-of-type(88) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(88) .flip {
    left: calc(30% + 79px);
  }

  .rotate:nth-of-type(89) {
    animation: rotation linear infinite reverse;
    animation-delay: -46154ms;
    animation-duration: 47288ms;
  }

  .rotate:nth-of-type(89) .flip-rotate {
    transform: rotateX(76deg);
  }

  .rotate:nth-of-type(89) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(89) .flip {
    left: calc(30% + 78px);
  }

  .rotate:nth-of-type(90) {
    animation: rotation linear infinite reverse;
    animation-delay: -41005ms;
    animation-duration: 52106ms;
  }

  .rotate:nth-of-type(90) .flip-rotate {
    transform: rotateX(77deg);
  }

  .rotate:nth-of-type(90) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(90) .flip {
    left: calc(30% + 104px);
  }

  .rotate:nth-of-type(91) {
    animation: rotation linear infinite reverse;
    animation-delay: -40295ms;
    animation-duration: 33172ms;
  }

  .rotate:nth-of-type(91) .flip-rotate {
    transform: rotateX(33deg);
  }

  .rotate:nth-of-type(91) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(91) .flip {
    left: calc(30% + 124px);
  }

  .rotate:nth-of-type(92) {
    animation: rotation linear infinite reverse;
    animation-delay: -42358ms;
    animation-duration: 41857ms;
  }

  .rotate:nth-of-type(92) .flip-rotate {
    transform: rotateX(10deg);
  }

  .rotate:nth-of-type(92) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(92) .flip {
    left: calc(30% + 78px);
  }

  .rotate:nth-of-type(93) {
    animation: rotation linear infinite reverse;
    animation-delay: -45216ms;
    animation-duration: 21897ms;
  }

  .rotate:nth-of-type(93) .flip-rotate {
    transform: rotateX(14deg);
  }

  .rotate:nth-of-type(93) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(93) .flip {
    left: calc(30% + 103px);
  }

  .rotate:nth-of-type(94) {
    animation: rotation linear infinite reverse;
    animation-delay: -41505ms;
    animation-duration: 20471ms;
  }

  .rotate:nth-of-type(94) .flip-rotate {
    transform: rotateX(73deg);
  }

  .rotate:nth-of-type(94) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(94) .flip {
    left: calc(30% + 80px);
  }

  .rotate:nth-of-type(95) {
    animation: rotation linear infinite reverse;
    animation-delay: -41230ms;
    animation-duration: 39921ms;
  }

  .rotate:nth-of-type(95) .flip-rotate {
    transform: rotateX(60deg);
  }

  .rotate:nth-of-type(95) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(95) .flip {
    left: calc(30% + 120px);
  }

  .rotate:nth-of-type(96) {
    animation: rotation linear infinite reverse;
    animation-delay: -47475ms;
    animation-duration: 56711ms;
  }

  .rotate:nth-of-type(96) .flip-rotate {
    transform: rotateX(2deg);
  }

  .rotate:nth-of-type(96) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(96) .flip {
    left: calc(30% + 84px);
  }

  .rotate:nth-of-type(97) {
    animation: rotation linear infinite reverse;
    animation-delay: -49382ms;
    animation-duration: 20198ms;
  }

  .rotate:nth-of-type(97) .flip-rotate {
    transform: rotateX(46deg);
  }

  .rotate:nth-of-type(97) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(97) .flip {
    left: calc(30% + 97px);
  }

  .rotate:nth-of-type(98) {
    animation: rotation linear infinite reverse;
    animation-delay: -44335ms;
    animation-duration: 28900ms;
  }

  .rotate:nth-of-type(98) .flip-rotate {
    transform: rotateX(30deg);
  }

  .rotate:nth-of-type(98) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(98) .flip {
    left: calc(30% + 57px);
  }

  .rotate:nth-of-type(99) {
    animation: rotation linear infinite reverse;
    animation-delay: -43098ms;
    animation-duration: 56639ms;
  }

  .rotate:nth-of-type(99) .flip-rotate {
    transform: rotateX(20deg);
  }

  .rotate:nth-of-type(99) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(99) .flip {
    left: calc(30% + 76px);
  }

  .rotate:nth-of-type(100) {
    animation: rotation linear infinite reverse;
    animation-delay: -40372ms;
    animation-duration: 21611ms;
  }

  .rotate:nth-of-type(100) .flip-rotate {
    transform: rotateX(39deg);
  }

  .rotate:nth-of-type(100) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(100) .flip {
    left: calc(30% + 92px);
  }

  .rotate:nth-of-type(101) {
    animation: rotation linear infinite reverse;
    animation-delay: -41166ms;
    animation-duration: 41817ms;
  }

  .rotate:nth-of-type(101) .flip-rotate {
    transform: rotateX(13deg);
  }

  .rotate:nth-of-type(101) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(101) .flip {
    left: calc(30% + 60px);
  }

  .rotate:nth-of-type(102) {
    animation: rotation linear infinite reverse;
    animation-delay: -42577ms;
    animation-duration: 43371ms;
  }

  .rotate:nth-of-type(102) .flip-rotate {
    transform: rotateX(43deg);
  }

  .rotate:nth-of-type(102) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(102) .flip {
    left: calc(30% + 65px);
  }

  .rotate:nth-of-type(103) {
    animation: rotation linear infinite reverse;
    animation-delay: -40577ms;
    animation-duration: 49015ms;
  }

  .rotate:nth-of-type(103) .flip-rotate {
    transform: rotateX(58deg);
  }

  .rotate:nth-of-type(103) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(103) .flip {
    left: calc(30% + 52px);
  }

  .rotate:nth-of-type(104) {
    animation: rotation linear infinite reverse;
    animation-delay: -47886ms;
    animation-duration: 24883ms;
  }

  .rotate:nth-of-type(104) .flip-rotate {
    transform: rotateX(11deg);
  }

  .rotate:nth-of-type(104) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(104) .flip {
    left: calc(30% + 78px);
  }

  .rotate:nth-of-type(105) {
    animation: rotation linear infinite reverse;
    animation-delay: -45921ms;
    animation-duration: 51311ms;
  }

  .rotate:nth-of-type(105) .flip-rotate {
    transform: rotateX(20deg);
  }

  .rotate:nth-of-type(105) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(105) .flip {
    left: calc(30% + 115px);
  }

  .rotate:nth-of-type(106) {
    animation: rotation linear infinite reverse;
    animation-delay: -49301ms;
    animation-duration: 39765ms;
  }

  .rotate:nth-of-type(106) .flip-rotate {
    transform: rotateX(44deg);
  }

  .rotate:nth-of-type(106) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(106) .flip {
    left: calc(30% + 72px);
  }

  .rotate:nth-of-type(107) {
    animation: rotation linear infinite reverse;
    animation-delay: -45833ms;
    animation-duration: 49022ms;
  }

  .rotate:nth-of-type(107) .flip-rotate {
    transform: rotateX(31deg);
  }

  .rotate:nth-of-type(107) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(107) .flip {
    left: calc(30% + 130px);
  }

  .rotate:nth-of-type(108) {
    animation: rotation linear infinite reverse;
    animation-delay: -43958ms;
    animation-duration: 42833ms;
  }

  .rotate:nth-of-type(108) .flip-rotate {
    transform: rotateX(80deg);
  }

  .rotate:nth-of-type(108) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(108) .flip {
    left: calc(30% + 81px);
  }

  .rotate:nth-of-type(109) {
    animation: rotation linear infinite reverse;
    animation-delay: -49449ms;
    animation-duration: 27676ms;
  }

  .rotate:nth-of-type(109) .flip-rotate {
    transform: rotateX(87deg);
  }

  .rotate:nth-of-type(109) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(109) .flip {
    left: calc(30% + 92px);
  }

  .rotate:nth-of-type(110) {
    animation: rotation linear infinite reverse;
    animation-delay: -40713ms;
    animation-duration: 57375ms;
  }

  .rotate:nth-of-type(110) .flip-rotate {
    transform: rotateX(65deg);
  }

  .rotate:nth-of-type(110) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(110) .flip {
    left: calc(30% + 59px);
  }

  .rotate:nth-of-type(111) {
    animation: rotation linear infinite reverse;
    animation-delay: -47700ms;
    animation-duration: 41594ms;
  }

  .rotate:nth-of-type(111) .flip-rotate {
    transform: rotateX(15deg);
  }

  .rotate:nth-of-type(111) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(111) .flip {
    left: calc(30% + 55px);
  }

  .rotate:nth-of-type(112) {
    animation: rotation linear infinite reverse;
    animation-delay: -41824ms;
    animation-duration: 57180ms;
  }

  .rotate:nth-of-type(112) .flip-rotate {
    transform: rotateX(66deg);
  }

  .rotate:nth-of-type(112) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(112) .flip {
    left: calc(30% + 59px);
  }

  .rotate:nth-of-type(113) {
    animation: rotation linear infinite reverse;
    animation-delay: -47897ms;
    animation-duration: 47793ms;
  }

  .rotate:nth-of-type(113) .flip-rotate {
    transform: rotateX(2deg);
  }

  .rotate:nth-of-type(113) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(113) .flip {
    left: calc(30% + 95px);
  }

  .rotate:nth-of-type(114) {
    animation: rotation linear infinite reverse;
    animation-delay: -44311ms;
    animation-duration: 22655ms;
  }

  .rotate:nth-of-type(114) .flip-rotate {
    transform: rotateX(7deg);
  }

  .rotate:nth-of-type(114) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(114) .flip {
    left: calc(30% + 69px);
  }

  .rotate:nth-of-type(115) {
    animation: rotation linear infinite reverse;
    animation-delay: -49699ms;
    animation-duration: 47038ms;
  }

  .rotate:nth-of-type(115) .flip-rotate {
    transform: rotateX(46deg);
  }

  .rotate:nth-of-type(115) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(115) .flip {
    left: calc(30% + 103px);
  }

  .rotate:nth-of-type(116) {
    animation: rotation linear infinite reverse;
    animation-delay: -40309ms;
    animation-duration: 41430ms;
  }

  .rotate:nth-of-type(116) .flip-rotate {
    transform: rotateX(46deg);
  }

  .rotate:nth-of-type(116) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(116) .flip {
    left: calc(30% + 59px);
  }

  .rotate:nth-of-type(117) {
    animation: rotation linear infinite reverse;
    animation-delay: -49293ms;
    animation-duration: 27843ms;
  }

  .rotate:nth-of-type(117) .flip-rotate {
    transform: rotateX(48deg);
  }

  .rotate:nth-of-type(117) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(117) .flip {
    left: calc(30% + 119px);
  }

  .rotate:nth-of-type(118) {
    animation: rotation linear infinite reverse;
    animation-delay: -46659ms;
    animation-duration: 41181ms;
  }

  .rotate:nth-of-type(118) .flip-rotate {
    transform: rotateX(54deg);
  }

  .rotate:nth-of-type(118) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(118) .flip {
    left: calc(30% + 58px);
  }

  .rotate:nth-of-type(119) {
    animation: rotation linear infinite reverse;
    animation-delay: -42729ms;
    animation-duration: 30009ms;
  }

  .rotate:nth-of-type(119) .flip-rotate {
    transform: rotateX(33deg);
  }

  .rotate:nth-of-type(119) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(119) .flip {
    left: calc(30% + 54px);
  }

  .rotate:nth-of-type(120) {
    animation: rotation linear infinite reverse;
    animation-delay: -46888ms;
    animation-duration: 34377ms;
  }

  .rotate:nth-of-type(120) .flip-rotate {
    transform: rotateX(78deg);
  }

  .rotate:nth-of-type(120) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(120) .flip {
    left: calc(30% + 76px);
  }

  .rotate:nth-of-type(121) {
    animation: rotation linear infinite reverse;
    animation-delay: -48318ms;
    animation-duration: 45649ms;
  }

  .rotate:nth-of-type(121) .flip-rotate {
    transform: rotateX(18deg);
  }

  .rotate:nth-of-type(121) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(121) .flip {
    left: calc(30% + 55px);
  }

  .rotate:nth-of-type(122) {
    animation: rotation linear infinite reverse;
    animation-delay: -43639ms;
    animation-duration: 35703ms;
  }

  .rotate:nth-of-type(122) .flip-rotate {
    transform: rotateX(64deg);
  }

  .rotate:nth-of-type(122) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(122) .flip {
    left: calc(30% + 73px);
  }

  .rotate:nth-of-type(123) {
    animation: rotation linear infinite reverse;
    animation-delay: -46066ms;
    animation-duration: 49352ms;
  }

  .rotate:nth-of-type(123) .flip-rotate {
    transform: rotateX(10deg);
  }

  .rotate:nth-of-type(123) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(123) .flip {
    left: calc(30% + 93px);
  }

  .rotate:nth-of-type(124) {
    animation: rotation linear infinite reverse;
    animation-delay: -40842ms;
    animation-duration: 46149ms;
  }

  .rotate:nth-of-type(124) .flip-rotate {
    transform: rotateX(46deg);
  }

  .rotate:nth-of-type(124) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(124) .flip {
    left: calc(30% + 129px);
  }

  .rotate:nth-of-type(125) {
    animation: rotation linear infinite reverse;
    animation-delay: -44707ms;
    animation-duration: 35764ms;
  }

  .rotate:nth-of-type(125) .flip-rotate {
    transform: rotateX(50deg);
  }

  .rotate:nth-of-type(125) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(125) .flip {
    left: calc(30% + 64px);
  }

  .rotate:nth-of-type(126) {
    animation: rotation linear infinite reverse;
    animation-delay: -48474ms;
    animation-duration: 34319ms;
  }

  .rotate:nth-of-type(126) .flip-rotate {
    transform: rotateX(55deg);
  }

  .rotate:nth-of-type(126) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(126) .flip {
    left: calc(30% + 114px);
  }

  .rotate:nth-of-type(127) {
    animation: rotation linear infinite reverse;
    animation-delay: -40066ms;
    animation-duration: 25106ms;
  }

  .rotate:nth-of-type(127) .flip-rotate {
    transform: rotateX(7deg);
  }

  .rotate:nth-of-type(127) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(127) .flip {
    left: calc(30% + 130px);
  }

  .rotate:nth-of-type(128) {
    animation: rotation linear infinite reverse;
    animation-delay: -44777ms;
    animation-duration: 27527ms;
  }

  .rotate:nth-of-type(128) .flip-rotate {
    transform: rotateX(72deg);
  }

  .rotate:nth-of-type(128) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(128) .flip {
    left: calc(30% + 78px);
  }

  .rotate:nth-of-type(129) {
    animation: rotation linear infinite reverse;
    animation-delay: -42407ms;
    animation-duration: 37459ms;
  }

  .rotate:nth-of-type(129) .flip-rotate {
    transform: rotateX(10deg);
  }

  .rotate:nth-of-type(129) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(129) .flip {
    left: calc(30% + 117px);
  }

  .rotate:nth-of-type(130) {
    animation: rotation linear infinite reverse;
    animation-delay: -44218ms;
    animation-duration: 30590ms;
  }

  .rotate:nth-of-type(130) .flip-rotate {
    transform: rotateX(66deg);
  }

  .rotate:nth-of-type(130) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(130) .flip {
    left: calc(30% + 98px);
  }

  .rotate:nth-of-type(131) {
    animation: rotation linear infinite reverse;
    animation-delay: -48654ms;
    animation-duration: 32097ms;
  }

  .rotate:nth-of-type(131) .flip-rotate {
    transform: rotateX(15deg);
  }

  .rotate:nth-of-type(131) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(131) .flip {
    left: calc(30% + 87px);
  }

  .rotate:nth-of-type(132) {
    animation: rotation linear infinite reverse;
    animation-delay: -43715ms;
    animation-duration: 31485ms;
  }

  .rotate:nth-of-type(132) .flip-rotate {
    transform: rotateX(24deg);
  }

  .rotate:nth-of-type(132) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(132) .flip {
    left: calc(30% + 128px);
  }

  .rotate:nth-of-type(133) {
    animation: rotation linear infinite reverse;
    animation-delay: -45386ms;
    animation-duration: 27942ms;
  }

  .rotate:nth-of-type(133) .flip-rotate {
    transform: rotateX(62deg);
  }

  .rotate:nth-of-type(133) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(133) .flip {
    left: calc(30% + 93px);
  }

  .rotate:nth-of-type(134) {
    animation: rotation linear infinite reverse;
    animation-delay: -47773ms;
    animation-duration: 29422ms;
  }

  .rotate:nth-of-type(134) .flip-rotate {
    transform: rotateX(82deg);
  }

  .rotate:nth-of-type(134) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(134) .flip {
    left: calc(30% + 113px);
  }

  .rotate:nth-of-type(135) {
    animation: rotation linear infinite reverse;
    animation-delay: -43305ms;
    animation-duration: 52421ms;
  }

  .rotate:nth-of-type(135) .flip-rotate {
    transform: rotateX(11deg);
  }

  .rotate:nth-of-type(135) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(135) .flip {
    left: calc(30% + 66px);
  }

  .rotate:nth-of-type(136) {
    animation: rotation linear infinite reverse;
    animation-delay: -42044ms;
    animation-duration: 48772ms;
  }

  .rotate:nth-of-type(136) .flip-rotate {
    transform: rotateX(26deg);
  }

  .rotate:nth-of-type(136) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(136) .flip {
    left: calc(30% + 129px);
  }

  .rotate:nth-of-type(137) {
    animation: rotation linear infinite reverse;
    animation-delay: -48748ms;
    animation-duration: 54093ms;
  }

  .rotate:nth-of-type(137) .flip-rotate {
    transform: rotateX(38deg);
  }

  .rotate:nth-of-type(137) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(137) .flip {
    left: calc(30% + 100px);
  }

  .rotate:nth-of-type(138) {
    animation: rotation linear infinite reverse;
    animation-delay: -46811ms;
    animation-duration: 57850ms;
  }

  .rotate:nth-of-type(138) .flip-rotate {
    transform: rotateX(58deg);
  }

  .rotate:nth-of-type(138) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(138) .flip {
    left: calc(30% + 61px);
  }

  .rotate:nth-of-type(139) {
    animation: rotation linear infinite reverse;
    animation-delay: -46139ms;
    animation-duration: 23789ms;
  }

  .rotate:nth-of-type(139) .flip-rotate {
    transform: rotateX(84deg);
  }

  .rotate:nth-of-type(139) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(139) .flip {
    left: calc(30% + 115px);
  }

  .rotate:nth-of-type(140) {
    animation: rotation linear infinite reverse;
    animation-delay: -40150ms;
    animation-duration: 27618ms;
  }

  .rotate:nth-of-type(140) .flip-rotate {
    transform: rotateX(7deg);
  }

  .rotate:nth-of-type(140) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(140) .flip {
    left: calc(30% + 60px);
  }

  .rotate:nth-of-type(141) {
    animation: rotation linear infinite reverse;
    animation-delay: -48673ms;
    animation-duration: 50918ms;
  }

  .rotate:nth-of-type(141) .flip-rotate {
    transform: rotateX(70deg);
  }

  .rotate:nth-of-type(141) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(141) .flip {
    left: calc(30% + 60px);
  }

  .rotate:nth-of-type(142) {
    animation: rotation linear infinite reverse;
    animation-delay: -47344ms;
    animation-duration: 38815ms;
  }

  .rotate:nth-of-type(142) .flip-rotate {
    transform: rotateX(17deg);
  }

  .rotate:nth-of-type(142) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(142) .flip {
    left: calc(30% + 110px);
  }

  .rotate:nth-of-type(143) {
    animation: rotation linear infinite reverse;
    animation-delay: -44148ms;
    animation-duration: 33481ms;
  }

  .rotate:nth-of-type(143) .flip-rotate {
    transform: rotateX(83deg);
  }

  .rotate:nth-of-type(143) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(143) .flip {
    left: calc(30% + 65px);
  }

  .rotate:nth-of-type(144) {
    animation: rotation linear infinite reverse;
    animation-delay: -43076ms;
    animation-duration: 50297ms;
  }

  .rotate:nth-of-type(144) .flip-rotate {
    transform: rotateX(59deg);
  }

  .rotate:nth-of-type(144) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(144) .flip {
    left: calc(30% + 93px);
  }

  .rotate:nth-of-type(145) {
    animation: rotation linear infinite reverse;
    animation-delay: -43292ms;
    animation-duration: 26483ms;
  }

  .rotate:nth-of-type(145) .flip-rotate {
    transform: rotateX(52deg);
  }

  .rotate:nth-of-type(145) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(145) .flip {
    left: calc(30% + 60px);
  }

  .rotate:nth-of-type(146) {
    animation: rotation linear infinite reverse;
    animation-delay: -40329ms;
    animation-duration: 44415ms;
  }

  .rotate:nth-of-type(146) .flip-rotate {
    transform: rotateX(60deg);
  }

  .rotate:nth-of-type(146) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(146) .flip {
    left: calc(30% + 70px);
  }

  .rotate:nth-of-type(147) {
    animation: rotation linear infinite reverse;
    animation-delay: -46308ms;
    animation-duration: 55399ms;
  }

  .rotate:nth-of-type(147) .flip-rotate {
    transform: rotateX(45deg);
  }

  .rotate:nth-of-type(147) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(147) .flip {
    left: calc(30% + 102px);
  }

  .rotate:nth-of-type(148) {
    animation: rotation linear infinite reverse;
    animation-delay: -47965ms;
    animation-duration: 40529ms;
  }

  .rotate:nth-of-type(148) .flip-rotate {
    transform: rotateX(71deg);
  }

  .rotate:nth-of-type(148) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(148) .flip {
    left: calc(30% + 115px);
  }

  .rotate:nth-of-type(149) {
    animation: rotation linear infinite reverse;
    animation-delay: -48350ms;
    animation-duration: 54137ms;
  }

  .rotate:nth-of-type(149) .flip-rotate {
    transform: rotateX(47deg);
  }

  .rotate:nth-of-type(149) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(149) .flip {
    left: calc(30% + 84px);
  }

  .rotate:nth-of-type(150) {
    animation: rotation linear infinite reverse;
    animation-delay: -44141ms;
    animation-duration: 37917ms;
  }

  .rotate:nth-of-type(150) .flip-rotate {
    transform: rotateX(22deg);
  }

  .rotate:nth-of-type(150) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(150) .flip {
    left: calc(30% + 52px);
  }

  .rotate:nth-of-type(151) {
    animation: rotation linear infinite reverse;
    animation-delay: -40031ms;
    animation-duration: 45488ms;
  }

  .rotate:nth-of-type(151) .flip-rotate {
    transform: rotateX(39deg);
  }

  .rotate:nth-of-type(151) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(151) .flip {
    left: calc(30% + 111px);
  }

  .rotate:nth-of-type(152) {
    animation: rotation linear infinite reverse;
    animation-delay: -45904ms;
    animation-duration: 32538ms;
  }

  .rotate:nth-of-type(152) .flip-rotate {
    transform: rotateX(13deg);
  }

  .rotate:nth-of-type(152) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(152) .flip {
    left: calc(30% + 61px);
  }

  .rotate:nth-of-type(153) {
    animation: rotation linear infinite reverse;
    animation-delay: -41916ms;
    animation-duration: 32558ms;
  }

  .rotate:nth-of-type(153) .flip-rotate {
    transform: rotateX(85deg);
  }

  .rotate:nth-of-type(153) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(153) .flip {
    left: calc(30% + 68px);
  }

  .rotate:nth-of-type(154) {
    animation: rotation linear infinite reverse;
    animation-delay: -48538ms;
    animation-duration: 28305ms;
  }

  .rotate:nth-of-type(154) .flip-rotate {
    transform: rotateX(4deg);
  }

  .rotate:nth-of-type(154) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(154) .flip {
    left: calc(30% + 83px);
  }

  .rotate:nth-of-type(155) {
    animation: rotation linear infinite reverse;
    animation-delay: -40158ms;
    animation-duration: 27122ms;
  }

  .rotate:nth-of-type(155) .flip-rotate {
    transform: rotateX(43deg);
  }

  .rotate:nth-of-type(155) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(155) .flip {
    left: calc(30% + 124px);
  }

  .rotate:nth-of-type(156) {
    animation: rotation linear infinite reverse;
    animation-delay: -48009ms;
    animation-duration: 31327ms;
  }

  .rotate:nth-of-type(156) .flip-rotate {
    transform: rotateX(57deg);
  }

  .rotate:nth-of-type(156) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(156) .flip {
    left: calc(30% + 63px);
  }

  .rotate:nth-of-type(157) {
    animation: rotation linear infinite reverse;
    animation-delay: -44565ms;
    animation-duration: 20895ms;
  }

  .rotate:nth-of-type(157) .flip-rotate {
    transform: rotateX(63deg);
  }

  .rotate:nth-of-type(157) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(157) .flip {
    left: calc(30% + 69px);
  }

  .rotate:nth-of-type(158) {
    animation: rotation linear infinite reverse;
    animation-delay: -44525ms;
    animation-duration: 51552ms;
  }

  .rotate:nth-of-type(158) .flip-rotate {
    transform: rotateX(44deg);
  }

  .rotate:nth-of-type(158) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(158) .flip {
    left: calc(30% + 97px);
  }

  .rotate:nth-of-type(159) {
    animation: rotation linear infinite reverse;
    animation-delay: -40751ms;
    animation-duration: 35463ms;
  }

  .rotate:nth-of-type(159) .flip-rotate {
    transform: rotateX(40deg);
  }

  .rotate:nth-of-type(159) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(159) .flip {
    left: calc(30% + 73px);
  }

  .rotate:nth-of-type(160) {
    animation: rotation linear infinite reverse;
    animation-delay: -47529ms;
    animation-duration: 26988ms;
  }

  .rotate:nth-of-type(160) .flip-rotate {
    transform: rotateX(26deg);
  }

  .rotate:nth-of-type(160) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(160) .flip {
    left: calc(30% + 123px);
  }

  .rotate:nth-of-type(161) {
    animation: rotation linear infinite reverse;
    animation-delay: -41177ms;
    animation-duration: 21969ms;
  }

  .rotate:nth-of-type(161) .flip-rotate {
    transform: rotateX(50deg);
  }

  .rotate:nth-of-type(161) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(161) .flip {
    left: calc(30% + 52px);
  }

  .rotate:nth-of-type(162) {
    animation: rotation linear infinite reverse;
    animation-delay: -46682ms;
    animation-duration: 55903ms;
  }

  .rotate:nth-of-type(162) .flip-rotate {
    transform: rotateX(9deg);
  }

  .rotate:nth-of-type(162) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(162) .flip {
    left: calc(30% + 67px);
  }

  .rotate:nth-of-type(163) {
    animation: rotation linear infinite reverse;
    animation-delay: -49971ms;
    animation-duration: 26785ms;
  }

  .rotate:nth-of-type(163) .flip-rotate {
    transform: rotateX(73deg);
  }

  .rotate:nth-of-type(163) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(163) .flip {
    left: calc(30% + 114px);
  }

  .rotate:nth-of-type(164) {
    animation: rotation linear infinite reverse;
    animation-delay: -40939ms;
    animation-duration: 50020ms;
  }

  .rotate:nth-of-type(164) .flip-rotate {
    transform: rotateX(1deg);
  }

  .rotate:nth-of-type(164) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(164) .flip {
    left: calc(30% + 54px);
  }

  .rotate:nth-of-type(165) {
    animation: rotation linear infinite reverse;
    animation-delay: -44382ms;
    animation-duration: 20289ms;
  }

  .rotate:nth-of-type(165) .flip-rotate {
    transform: rotateX(58deg);
  }

  .rotate:nth-of-type(165) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(165) .flip {
    left: calc(30% + 64px);
  }

  .rotate:nth-of-type(166) {
    animation: rotation linear infinite reverse;
    animation-delay: -44932ms;
    animation-duration: 38396ms;
  }

  .rotate:nth-of-type(166) .flip-rotate {
    transform: rotateX(37deg);
  }

  .rotate:nth-of-type(166) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(166) .flip {
    left: calc(30% + 103px);
  }

  .rotate:nth-of-type(167) {
    animation: rotation linear infinite reverse;
    animation-delay: -42868ms;
    animation-duration: 47140ms;
  }

  .rotate:nth-of-type(167) .flip-rotate {
    transform: rotateX(88deg);
  }

  .rotate:nth-of-type(167) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(167) .flip {
    left: calc(30% + 86px);
  }

  .rotate:nth-of-type(168) {
    animation: rotation linear infinite reverse;
    animation-delay: -41509ms;
    animation-duration: 40652ms;
  }

  .rotate:nth-of-type(168) .flip-rotate {
    transform: rotateX(39deg);
  }

  .rotate:nth-of-type(168) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(168) .flip {
    left: calc(30% + 69px);
  }

  .rotate:nth-of-type(169) {
    animation: rotation linear infinite reverse;
    animation-delay: -42398ms;
    animation-duration: 45015ms;
  }

  .rotate:nth-of-type(169) .flip-rotate {
    transform: rotateX(73deg);
  }

  .rotate:nth-of-type(169) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(169) .flip {
    left: calc(30% + 129px);
  }

  .rotate:nth-of-type(170) {
    animation: rotation linear infinite reverse;
    animation-delay: -48919ms;
    animation-duration: 32829ms;
  }

  .rotate:nth-of-type(170) .flip-rotate {
    transform: rotateX(73deg);
  }

  .rotate:nth-of-type(170) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(170) .flip {
    left: calc(30% + 67px);
  }

  .rotate:nth-of-type(171) {
    animation: rotation linear infinite reverse;
    animation-delay: -43213ms;
    animation-duration: 55545ms;
  }

  .rotate:nth-of-type(171) .flip-rotate {
    transform: rotateX(83deg);
  }

  .rotate:nth-of-type(171) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(171) .flip {
    left: calc(30% + 95px);
  }

  .rotate:nth-of-type(172) {
    animation: rotation linear infinite reverse;
    animation-delay: -42189ms;
    animation-duration: 56975ms;
  }

  .rotate:nth-of-type(172) .flip-rotate {
    transform: rotateX(4deg);
  }

  .rotate:nth-of-type(172) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(172) .flip {
    left: calc(30% + 111px);
  }

  .rotate:nth-of-type(173) {
    animation: rotation linear infinite reverse;
    animation-delay: -49427ms;
    animation-duration: 52030ms;
  }

  .rotate:nth-of-type(173) .flip-rotate {
    transform: rotateX(17deg);
  }

  .rotate:nth-of-type(173) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(173) .flip {
    left: calc(30% + 66px);
  }

  .rotate:nth-of-type(174) {
    animation: rotation linear infinite reverse;
    animation-delay: -42777ms;
    animation-duration: 43550ms;
  }

  .rotate:nth-of-type(174) .flip-rotate {
    transform: rotateX(56deg);
  }

  .rotate:nth-of-type(174) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(174) .flip {
    left: calc(30% + 71px);
  }

  .rotate:nth-of-type(175) {
    animation: rotation linear infinite reverse;
    animation-delay: -46863ms;
    animation-duration: 50187ms;
  }

  .rotate:nth-of-type(175) .flip-rotate {
    transform: rotateX(73deg);
  }

  .rotate:nth-of-type(175) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(175) .flip {
    left: calc(30% + 130px);
  }

  .rotate:nth-of-type(176) {
    animation: rotation linear infinite reverse;
    animation-delay: -46726ms;
    animation-duration: 34218ms;
  }

  .rotate:nth-of-type(176) .flip-rotate {
    transform: rotateX(16deg);
  }

  .rotate:nth-of-type(176) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(176) .flip {
    left: calc(30% + 96px);
  }

  .rotate:nth-of-type(177) {
    animation: rotation linear infinite reverse;
    animation-delay: -44882ms;
    animation-duration: 41322ms;
  }

  .rotate:nth-of-type(177) .flip-rotate {
    transform: rotateX(26deg);
  }

  .rotate:nth-of-type(177) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(177) .flip {
    left: calc(30% + 71px);
  }

  .rotate:nth-of-type(178) {
    animation: rotation linear infinite reverse;
    animation-delay: -46349ms;
    animation-duration: 42825ms;
  }

  .rotate:nth-of-type(178) .flip-rotate {
    transform: rotateX(3deg);
  }

  .rotate:nth-of-type(178) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(178) .flip {
    left: calc(30% + 113px);
  }

  .rotate:nth-of-type(179) {
    animation: rotation linear infinite reverse;
    animation-delay: -45501ms;
    animation-duration: 42248ms;
  }

  .rotate:nth-of-type(179) .flip-rotate {
    transform: rotateX(34deg);
  }

  .rotate:nth-of-type(179) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(179) .flip {
    left: calc(30% + 114px);
  }

  .rotate:nth-of-type(180) {
    animation: rotation linear infinite reverse;
    animation-delay: -42674ms;
    animation-duration: 48106ms;
  }

  .rotate:nth-of-type(180) .flip-rotate {
    transform: rotateX(49deg);
  }

  .rotate:nth-of-type(180) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(180) .flip {
    left: calc(30% + 77px);
  }

  .rotate:nth-of-type(181) {
    animation: rotation linear infinite reverse;
    animation-delay: -44730ms;
    animation-duration: 22549ms;
  }

  .rotate:nth-of-type(181) .flip-rotate {
    transform: rotateX(59deg);
  }

  .rotate:nth-of-type(181) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(181) .flip {
    left: calc(30% + 103px);
  }

  .rotate:nth-of-type(182) {
    animation: rotation linear infinite reverse;
    animation-delay: -47154ms;
    animation-duration: 53465ms;
  }

  .rotate:nth-of-type(182) .flip-rotate {
    transform: rotateX(37deg);
  }

  .rotate:nth-of-type(182) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(182) .flip {
    left: calc(30% + 106px);
  }

  .rotate:nth-of-type(183) {
    animation: rotation linear infinite reverse;
    animation-delay: -43086ms;
    animation-duration: 57533ms;
  }

  .rotate:nth-of-type(183) .flip-rotate {
    transform: rotateX(77deg);
  }

  .rotate:nth-of-type(183) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(183) .flip {
    left: calc(30% + 128px);
  }

  .rotate:nth-of-type(184) {
    animation: rotation linear infinite reverse;
    animation-delay: -44300ms;
    animation-duration: 40934ms;
  }

  .rotate:nth-of-type(184) .flip-rotate {
    transform: rotateX(64deg);
  }

  .rotate:nth-of-type(184) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(184) .flip {
    left: calc(30% + 52px);
  }

  .rotate:nth-of-type(185) {
    animation: rotation linear infinite reverse;
    animation-delay: -48102ms;
    animation-duration: 22683ms;
  }

  .rotate:nth-of-type(185) .flip-rotate {
    transform: rotateX(12deg);
  }

  .rotate:nth-of-type(185) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(185) .flip {
    left: calc(30% + 67px);
  }

  .rotate:nth-of-type(186) {
    animation: rotation linear infinite reverse;
    animation-delay: -41316ms;
    animation-duration: 24437ms;
  }

  .rotate:nth-of-type(186) .flip-rotate {
    transform: rotateX(29deg);
  }

  .rotate:nth-of-type(186) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(186) .flip {
    left: calc(30% + 116px);
  }

  .rotate:nth-of-type(187) {
    animation: rotation linear infinite reverse;
    animation-delay: -48664ms;
    animation-duration: 22187ms;
  }

  .rotate:nth-of-type(187) .flip-rotate {
    transform: rotateX(71deg);
  }

  .rotate:nth-of-type(187) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(187) .flip {
    left: calc(30% + 83px);
  }

  .rotate:nth-of-type(188) {
    animation: rotation linear infinite reverse;
    animation-delay: -41228ms;
    animation-duration: 59356ms;
  }

  .rotate:nth-of-type(188) .flip-rotate {
    transform: rotateX(83deg);
  }

  .rotate:nth-of-type(188) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(188) .flip {
    left: calc(30% + 116px);
  }

  .rotate:nth-of-type(189) {
    animation: rotation linear infinite reverse;
    animation-delay: -41562ms;
    animation-duration: 20018ms;
  }

  .rotate:nth-of-type(189) .flip-rotate {
    transform: rotateX(64deg);
  }

  .rotate:nth-of-type(189) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(189) .flip {
    left: calc(30% + 124px);
  }

  .rotate:nth-of-type(190) {
    animation: rotation linear infinite reverse;
    animation-delay: -49027ms;
    animation-duration: 36219ms;
  }

  .rotate:nth-of-type(190) .flip-rotate {
    transform: rotateX(87deg);
  }

  .rotate:nth-of-type(190) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(190) .flip {
    left: calc(30% + 72px);
  }

  .rotate:nth-of-type(191) {
    animation: rotation linear infinite reverse;
    animation-delay: -43539ms;
    animation-duration: 21656ms;
  }

  .rotate:nth-of-type(191) .flip-rotate {
    transform: rotateX(78deg);
  }

  .rotate:nth-of-type(191) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(191) .flip {
    left: calc(30% + 82px);
  }

  .rotate:nth-of-type(192) {
    animation: rotation linear infinite reverse;
    animation-delay: -44800ms;
    animation-duration: 49097ms;
  }

  .rotate:nth-of-type(192) .flip-rotate {
    transform: rotateX(87deg);
  }

  .rotate:nth-of-type(192) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(192) .flip {
    left: calc(30% + 91px);
  }

  .rotate:nth-of-type(193) {
    animation: rotation linear infinite reverse;
    animation-delay: -43077ms;
    animation-duration: 50496ms;
  }

  .rotate:nth-of-type(193) .flip-rotate {
    transform: rotateX(15deg);
  }

  .rotate:nth-of-type(193) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(193) .flip {
    left: calc(30% + 85px);
  }

  .rotate:nth-of-type(194) {
    animation: rotation linear infinite reverse;
    animation-delay: -43318ms;
    animation-duration: 29861ms;
  }

  .rotate:nth-of-type(194) .flip-rotate {
    transform: rotateX(33deg);
  }

  .rotate:nth-of-type(194) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(194) .flip {
    left: calc(30% + 66px);
  }

  .rotate:nth-of-type(195) {
    animation: rotation linear infinite reverse;
    animation-delay: -48866ms;
    animation-duration: 35183ms;
  }

  .rotate:nth-of-type(195) .flip-rotate {
    transform: rotateX(88deg);
  }

  .rotate:nth-of-type(195) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(195) .flip {
    left: calc(30% + 101px);
  }

  .rotate:nth-of-type(196) {
    animation: rotation linear infinite reverse;
    animation-delay: -41590ms;
    animation-duration: 36579ms;
  }

  .rotate:nth-of-type(196) .flip-rotate {
    transform: rotateX(46deg);
  }

  .rotate:nth-of-type(196) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(196) .flip {
    left: calc(30% + 127px);
  }

  .rotate:nth-of-type(197) {
    animation: rotation linear infinite reverse;
    animation-delay: -49451ms;
    animation-duration: 25201ms;
  }

  .rotate:nth-of-type(197) .flip-rotate {
    transform: rotateX(17deg);
  }

  .rotate:nth-of-type(197) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(197) .flip {
    left: calc(30% + 122px);
  }

  .rotate:nth-of-type(198) {
    animation: rotation linear infinite reverse;
    animation-delay: -48328ms;
    animation-duration: 24681ms;
  }

  .rotate:nth-of-type(198) .flip-rotate {
    transform: rotateX(60deg);
  }

  .rotate:nth-of-type(198) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(198) .flip {
    left: calc(30% + 125px);
  }

  .rotate:nth-of-type(199) {
    animation: rotation linear infinite reverse;
    animation-delay: -49854ms;
    animation-duration: 41136ms;
  }

  .rotate:nth-of-type(199) .flip-rotate {
    transform: rotateX(44deg);
  }

  .rotate:nth-of-type(199) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(199) .flip {
    left: calc(30% + 96px);
  }

  .rotate:nth-of-type(200) {
    animation: rotation linear infinite reverse;
    animation-delay: -48365ms;
    animation-duration: 27867ms;
  }

  .rotate:nth-of-type(200) .flip-rotate {
    transform: rotateX(20deg);
  }

  .rotate:nth-of-type(200) .flip-pos {
    transform: translateY(50%);
  }

  .rotate:nth-of-type(200) .flip {
    left: calc(30% + 73px);
  }

  .rotate:nth-of-type(1) .flip {
    background-color: #f9f2ee;
    animation: rotate01 20578ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(2) .flip {
    background-color: #f9f2ee;
    animation: rotate01 31828ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(3) .flip {
    background-color: #f9f2ee;
    animation: rotate01 23430ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(4) .flip {
    background-color: #f9f2ee;
    animation: rotate01 25390ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(5) .flip {
    background-color: #f9f2ee;
    animation: rotate01 7356ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(6) .flip {
    background-color: #f9f2ee;
    animation: rotate01 25984ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(7) .flip {
    background-color: #f9f2ee;
    animation: rotate01 6168ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(8) .flip {
    background-color: #f9f2ee;
    animation: rotate01 12296ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(9) .flip {
    background-color: #f9f2ee;
    animation: rotate01 20507ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(10) .flip {
    background-color: #f9f2ee;
    animation: rotate01 3817ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(11) .flip {
    background-color: #f9f2ee;
    animation: rotate01 10724ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(12) .flip {
    background-color: #f9f2ee;
    animation: rotate01 27236ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(13) .flip {
    background-color: #f9f2ee;
    animation: rotate01 3043ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(14) .flip {
    background-color: #f9f2ee;
    animation: rotate01 13344ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(15) .flip {
    background-color: #f9f2ee;
    animation: rotate01 13061ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(16) .flip {
    background-color: #f9f2ee;
    animation: rotate01 28904ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(17) .flip {
    background-color: #f9f2ee;
    animation: rotate01 8607ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(18) .flip {
    background-color: #f9f2ee;
    animation: rotate01 14436ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(19) .flip {
    background-color: #f9f2ee;
    animation: rotate01 29546ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(20) .flip {
    background-color: #f9f2ee;
    animation: rotate01 3999ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(21) .flip {
    background-color: #f9f2ee;
    animation: rotate01 8688ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(22) .flip {
    background-color: #f9f2ee;
    animation: rotate01 5053ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(23) .flip {
    background-color: #f9f2ee;
    animation: rotate01 30029ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(24) .flip {
    background-color: #f9f2ee;
    animation: rotate01 16318ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(25) .flip {
    background-color: #f9f2ee;
    animation: rotate01 28085ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(26) .flip {
    background-color: #f9f2ee;
    animation: rotate01 18497ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(27) .flip {
    background-color: #f9f2ee;
    animation: rotate01 28005ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(28) .flip {
    background-color: #f9f2ee;
    animation: rotate01 20058ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(29) .flip {
    background-color: #f9f2ee;
    animation: rotate01 7563ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(30) .flip {
    background-color: #f9f2ee;
    animation: rotate01 10999ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(31) .flip {
    background-color: #f9f2ee;
    animation: rotate01 28554ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(32) .flip {
    background-color: #f9f2ee;
    animation: rotate01 29825ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(33) .flip {
    background-color: #f9f2ee;
    animation: rotate01 22137ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(34) .flip {
    background-color: #f9f2ee;
    animation: rotate01 7888ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(35) .flip {
    background-color: #f9f2ee;
    animation: rotate01 6081ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(36) .flip {
    background-color: #f9f2ee;
    animation: rotate01 19328ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(37) .flip {
    background-color: #f9f2ee;
    animation: rotate01 7713ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(38) .flip {
    background-color: #f9f2ee;
    animation: rotate01 15362ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(39) .flip {
    background-color: #f9f2ee;
    animation: rotate01 3854ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(40) .flip {
    background-color: #f9f2ee;
    animation: rotate01 22074ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(41) .flip {
    background-color: #f9f2ee;
    animation: rotate01 25685ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(42) .flip {
    background-color: #f9f2ee;
    animation: rotate01 10599ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(43) .flip {
    background-color: #f9f2ee;
    animation: rotate01 12073ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(44) .flip {
    background-color: #f9f2ee;
    animation: rotate01 15230ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(45) .flip {
    background-color: #f9f2ee;
    animation: rotate01 28501ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(46) .flip {
    background-color: #f9f2ee;
    animation: rotate01 19216ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(47) .flip {
    background-color: #f9f2ee;
    animation: rotate01 19525ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(48) .flip {
    background-color: #f9f2ee;
    animation: rotate01 15215ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(49) .flip {
    background-color: #f9f2ee;
    animation: rotate01 27687ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(50) .flip {
    background-color: #f9f2ee;
    animation: rotate01 26919ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(51) .flip {
    background-color: #f9f2ee;
    animation: rotate01 21158ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(52) .flip {
    background-color: #f9f2ee;
    animation: rotate01 6368ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(53) .flip {
    background-color: #f9f2ee;
    animation: rotate01 18704ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(54) .flip {
    background-color: #f9f2ee;
    animation: rotate01 27719ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(55) .flip {
    background-color: #f9f2ee;
    animation: rotate01 26185ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(56) .flip {
    background-color: #f9f2ee;
    animation: rotate01 31505ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(57) .flip {
    background-color: #f9f2ee;
    animation: rotate01 11670ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(58) .flip {
    background-color: #f9f2ee;
    animation: rotate01 23329ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(59) .flip {
    background-color: #f9f2ee;
    animation: rotate01 12127ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(60) .flip {
    background-color: #f9f2ee;
    animation: rotate01 8193ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(61) .flip {
    background-color: #f9f2ee;
    animation: rotate01 30031ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(62) .flip {
    background-color: #f9f2ee;
    animation: rotate01 5499ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(63) .flip {
    background-color: #f9f2ee;
    animation: rotate01 13529ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(64) .flip {
    background-color: #f9f2ee;
    animation: rotate01 27462ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(65) .flip {
    background-color: #f9f2ee;
    animation: rotate01 13297ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(66) .flip {
    background-color: #f9f2ee;
    animation: rotate01 23371ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(67) .flip {
    background-color: #f9f2ee;
    animation: rotate01 20034ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(68) .flip {
    background-color: #f9f2ee;
    animation: rotate01 15694ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(69) .flip {
    background-color: #f9f2ee;
    animation: rotate01 13558ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(70) .flip {
    background-color: #f9f2ee;
    animation: rotate01 25793ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(71) .flip {
    background-color: #f9f2ee;
    animation: rotate01 28367ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(72) .flip {
    background-color: #f9f2ee;
    animation: rotate01 7860ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(73) .flip {
    background-color: #f9f2ee;
    animation: rotate01 12947ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(74) .flip {
    background-color: #f9f2ee;
    animation: rotate01 4737ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(75) .flip {
    background-color: #f9f2ee;
    animation: rotate01 11699ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(76) .flip {
    background-color: #f9f2ee;
    animation: rotate01 18743ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(77) .flip {
    background-color: #f9f2ee;
    animation: rotate01 4758ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(78) .flip {
    background-color: #f9f2ee;
    animation: rotate01 13944ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(79) .flip {
    background-color: #f9f2ee;
    animation: rotate01 28017ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(80) .flip {
    background-color: #f9f2ee;
    animation: rotate01 30203ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(81) .flip {
    background-color: #f9f2ee;
    animation: rotate01 12744ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(82) .flip {
    background-color: #f9f2ee;
    animation: rotate01 5218ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(83) .flip {
    background-color: #f9f2ee;
    animation: rotate01 8582ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(84) .flip {
    background-color: #f9f2ee;
    animation: rotate01 29678ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(85) .flip {
    background-color: #f9f2ee;
    animation: rotate01 30312ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(86) .flip {
    background-color: #f9f2ee;
    animation: rotate01 19324ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(87) .flip {
    background-color: #f9f2ee;
    animation: rotate01 6860ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(88) .flip {
    background-color: #f9f2ee;
    animation: rotate01 21172ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(89) .flip {
    background-color: #f9f2ee;
    animation: rotate01 22184ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(90) .flip {
    background-color: #f9f2ee;
    animation: rotate01 19784ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(91) .flip {
    background-color: #f9f2ee;
    animation: rotate01 9677ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(92) .flip {
    background-color: #f9f2ee;
    animation: rotate01 11498ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(93) .flip {
    background-color: #f9f2ee;
    animation: rotate01 9026ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(94) .flip {
    background-color: #f9f2ee;
    animation: rotate01 3537ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(95) .flip {
    background-color: #f9f2ee;
    animation: rotate01 29749ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(96) .flip {
    background-color: #f9f2ee;
    animation: rotate01 26938ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(97) .flip {
    background-color: #f9f2ee;
    animation: rotate01 21656ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(98) .flip {
    background-color: #f9f2ee;
    animation: rotate01 8388ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(99) .flip {
    background-color: #f9f2ee;
    animation: rotate01 7497ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(100) .flip {
    background-color: #f9f2ee;
    animation: rotate01 22620ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(101) .flip {
    background-color: #f9f2ee;
    animation: rotate01 3072ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(102) .flip {
    background-color: #f9f2ee;
    animation: rotate01 7552ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(103) .flip {
    background-color: #f9f2ee;
    animation: rotate01 24250ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(104) .flip {
    background-color: #f9f2ee;
    animation: rotate01 5623ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(105) .flip {
    background-color: #f9f2ee;
    animation: rotate01 14096ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(106) .flip {
    background-color: #f9f2ee;
    animation: rotate01 27323ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(107) .flip {
    background-color: #f9f2ee;
    animation: rotate01 29610ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(108) .flip {
    background-color: #f9f2ee;
    animation: rotate01 28896ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(109) .flip {
    background-color: #f9f2ee;
    animation: rotate01 5477ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(110) .flip {
    background-color: #f9f2ee;
    animation: rotate01 16077ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(111) .flip {
    background-color: #f9f2ee;
    animation: rotate01 20312ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(112) .flip {
    background-color: #f9f2ee;
    animation: rotate01 19826ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(113) .flip {
    background-color: #f9f2ee;
    animation: rotate01 31998ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(114) .flip {
    background-color: #f9f2ee;
    animation: rotate01 30539ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(115) .flip {
    background-color: #f9f2ee;
    animation: rotate01 8231ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(116) .flip {
    background-color: #f9f2ee;
    animation: rotate01 21803ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(117) .flip {
    background-color: #f9f2ee;
    animation: rotate01 29173ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(118) .flip {
    background-color: #f9f2ee;
    animation: rotate01 12146ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(119) .flip {
    background-color: #f9f2ee;
    animation: rotate01 23643ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(120) .flip {
    background-color: #f9f2ee;
    animation: rotate01 3006ms infinite;
    transform: rotateX(90deg);
  }

  .rotate:nth-of-type(120) .flip {
    background-color: #f9d2d3;
    animation: rotate02 3731ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(121) .flip {
    background-color: #f9d2d3;
    animation: rotate02 14167ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(122) .flip {
    background-color: #f9d2d3;
    animation: rotate02 17776ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(123) .flip {
    background-color: #f9d2d3;
    animation: rotate02 29581ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(124) .flip {
    background-color: #f9d2d3;
    animation: rotate02 15212ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(125) .flip {
    background-color: #f9d2d3;
    animation: rotate02 8726ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(126) .flip {
    background-color: #f9d2d3;
    animation: rotate02 21818ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(127) .flip {
    background-color: #f9d2d3;
    animation: rotate02 23791ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(128) .flip {
    background-color: #f9d2d3;
    animation: rotate02 32035ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(129) .flip {
    background-color: #f9d2d3;
    animation: rotate02 31507ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(130) .flip {
    background-color: #f9d2d3;
    animation: rotate02 17672ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(131) .flip {
    background-color: #f9d2d3;
    animation: rotate02 9701ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(132) .flip {
    background-color: #f9d2d3;
    animation: rotate02 27597ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(133) .flip {
    background-color: #f9d2d3;
    animation: rotate02 13952ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(134) .flip {
    background-color: #f9d2d3;
    animation: rotate02 12768ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(135) .flip {
    background-color: #f9d2d3;
    animation: rotate02 6009ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(136) .flip {
    background-color: #f9d2d3;
    animation: rotate02 31781ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(137) .flip {
    background-color: #f9d2d3;
    animation: rotate02 10019ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(138) .flip {
    background-color: #f9d2d3;
    animation: rotate02 8340ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(139) .flip {
    background-color: #f9d2d3;
    animation: rotate02 30868ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(140) .flip {
    background-color: #f9d2d3;
    animation: rotate02 7409ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(141) .flip {
    background-color: #f9d2d3;
    animation: rotate02 28855ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(142) .flip {
    background-color: #f9d2d3;
    animation: rotate02 15351ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(143) .flip {
    background-color: #f9d2d3;
    animation: rotate02 14947ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(144) .flip {
    background-color: #f9d2d3;
    animation: rotate02 4651ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(145) .flip {
    background-color: #f9d2d3;
    animation: rotate02 18911ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(146) .flip {
    background-color: #f9d2d3;
    animation: rotate02 22825ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(147) .flip {
    background-color: #f9d2d3;
    animation: rotate02 12843ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(148) .flip {
    background-color: #f9d2d3;
    animation: rotate02 30209ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(149) .flip {
    background-color: #f9d2d3;
    animation: rotate02 3938ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(150) .flip {
    background-color: #f9d2d3;
    animation: rotate02 11219ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(151) .flip {
    background-color: #f9d2d3;
    animation: rotate02 24191ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(152) .flip {
    background-color: #f9d2d3;
    animation: rotate02 30032ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(153) .flip {
    background-color: #f9d2d3;
    animation: rotate02 8738ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(154) .flip {
    background-color: #f9d2d3;
    animation: rotate02 23806ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(155) .flip {
    background-color: #f9d2d3;
    animation: rotate02 20506ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(156) .flip {
    background-color: #f9d2d3;
    animation: rotate02 10094ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(157) .flip {
    background-color: #f9d2d3;
    animation: rotate02 24400ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(158) .flip {
    background-color: #f9d2d3;
    animation: rotate02 22199ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(159) .flip {
    background-color: #f9d2d3;
    animation: rotate02 16041ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(160) .flip {
    background-color: #f9d2d3;
    animation: rotate02 16039ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(161) .flip {
    background-color: #f9d2d3;
    animation: rotate02 6985ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(162) .flip {
    background-color: #f9d2d3;
    animation: rotate02 9686ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(163) .flip {
    background-color: #f9d2d3;
    animation: rotate02 8604ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(164) .flip {
    background-color: #f9d2d3;
    animation: rotate02 11344ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(165) .flip {
    background-color: #f9d2d3;
    animation: rotate02 31100ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(166) .flip {
    background-color: #f9d2d3;
    animation: rotate02 10708ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(167) .flip {
    background-color: #f9d2d3;
    animation: rotate02 29973ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(168) .flip {
    background-color: #f9d2d3;
    animation: rotate02 25608ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(169) .flip {
    background-color: #f9d2d3;
    animation: rotate02 32763ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(170) .flip {
    background-color: #f9d2d3;
    animation: rotate02 15774ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(171) .flip {
    background-color: #f9d2d3;
    animation: rotate02 15837ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(172) .flip {
    background-color: #f9d2d3;
    animation: rotate02 26741ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(173) .flip {
    background-color: #f9d2d3;
    animation: rotate02 13246ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(174) .flip {
    background-color: #f9d2d3;
    animation: rotate02 18269ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(175) .flip {
    background-color: #f9d2d3;
    animation: rotate02 6639ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(176) .flip {
    background-color: #f9d2d3;
    animation: rotate02 3985ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(177) .flip {
    background-color: #f9d2d3;
    animation: rotate02 32915ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(178) .flip {
    background-color: #f9d2d3;
    animation: rotate02 25921ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(179) .flip {
    background-color: #f9d2d3;
    animation: rotate02 13945ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(180) .flip {
    background-color: #f9d2d3;
    animation: rotate02 5578ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(181) .flip {
    background-color: #f9d2d3;
    animation: rotate02 26592ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(182) .flip {
    background-color: #f9d2d3;
    animation: rotate02 10589ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(183) .flip {
    background-color: #f9d2d3;
    animation: rotate02 19134ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(184) .flip {
    background-color: #f9d2d3;
    animation: rotate02 18094ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(185) .flip {
    background-color: #f9d2d3;
    animation: rotate02 29858ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(186) .flip {
    background-color: #f9d2d3;
    animation: rotate02 5180ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(187) .flip {
    background-color: #f9d2d3;
    animation: rotate02 13317ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(188) .flip {
    background-color: #f9d2d3;
    animation: rotate02 13675ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(189) .flip {
    background-color: #f9d2d3;
    animation: rotate02 4276ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(190) .flip {
    background-color: #f9d2d3;
    animation: rotate02 8847ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(191) .flip {
    background-color: #f9d2d3;
    animation: rotate02 7429ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(192) .flip {
    background-color: #f9d2d3;
    animation: rotate02 20816ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(193) .flip {
    background-color: #f9d2d3;
    animation: rotate02 13537ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(194) .flip {
    background-color: #f9d2d3;
    animation: rotate02 21455ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(195) .flip {
    background-color: #f9d2d3;
    animation: rotate02 18379ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(196) .flip {
    background-color: #f9d2d3;
    animation: rotate02 17408ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(197) .flip {
    background-color: #f9d2d3;
    animation: rotate02 4823ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(198) .flip {
    background-color: #f9d2d3;
    animation: rotate02 9801ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(199) .flip {
    background-color: #f9d2d3;
    animation: rotate02 25253ms infinite;
    transform: rotateX(90deg);
  }


  .rotate:nth-of-type(200) .flip {
    background-color: #f9d2d3;
    animation: rotate02 26220ms infinite;
    transform: rotateX(90deg);
  }


  @media screen and (max-width: 640px) {
    .rotate:nth-of-type(1) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(1) .flip {
      left: calc(30% + 18px);
    }

    .rotate:nth-of-type(2) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(2) .flip {
      left: calc(30% + 12px);
    }

    .rotate:nth-of-type(3) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(3) .flip {
      left: calc(30% + 11px);
    }

    .rotate:nth-of-type(4) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(4) .flip {
      left: calc(30% + 28px);
    }

    .rotate:nth-of-type(5) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(5) .flip {
      left: calc(30% + 40px);
    }

    .rotate:nth-of-type(6) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(6) .flip {
      left: calc(30% + 19px);
    }

    .rotate:nth-of-type(7) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(7) .flip {
      left: calc(30% + 13px);
    }

    .rotate:nth-of-type(8) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(8) .flip {
      left: calc(30% + 24px);
    }

    .rotate:nth-of-type(9) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(9) .flip {
      left: calc(30% + 24px);
    }

    .rotate:nth-of-type(10) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(10) .flip {
      left: calc(30% + 22px);
    }

    .rotate:nth-of-type(11) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(11) .flip {
      left: calc(30% + 35px);
    }

    .rotate:nth-of-type(12) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(12) .flip {
      left: calc(30% + 22px);
    }

    .rotate:nth-of-type(13) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(13) .flip {
      left: calc(30% + 23px);
    }

    .rotate:nth-of-type(14) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(14) .flip {
      left: calc(30% + 17px);
    }

    .rotate:nth-of-type(15) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(15) .flip {
      left: calc(30% + 33px);
    }

    .rotate:nth-of-type(16) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(16) .flip {
      left: calc(30% + 12px);
    }

    .rotate:nth-of-type(17) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(17) .flip {
      left: calc(30% + 35px);
    }

    .rotate:nth-of-type(18) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(18) .flip {
      left: calc(30% + 34px);
    }

    .rotate:nth-of-type(19) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(19) .flip {
      left: calc(30% + 12px);
    }

    .rotate:nth-of-type(20) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(20) .flip {
      left: calc(30% + 40px);
    }

    .rotate:nth-of-type(21) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(21) .flip {
      left: calc(30% + 38px);
    }

    .rotate:nth-of-type(22) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(22) .flip {
      left: calc(30% + 27px);
    }

    .rotate:nth-of-type(23) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(23) .flip {
      left: calc(30% + 17px);
    }

    .rotate:nth-of-type(24) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(24) .flip {
      left: calc(30% + 32px);
    }

    .rotate:nth-of-type(25) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(25) .flip {
      left: calc(30% + 33px);
    }

    .rotate:nth-of-type(26) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(26) .flip {
      left: calc(30% + 34px);
    }

    .rotate:nth-of-type(27) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(27) .flip {
      left: calc(30% + 40px);
    }

    .rotate:nth-of-type(28) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(28) .flip {
      left: calc(30% + 37px);
    }

    .rotate:nth-of-type(29) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(29) .flip {
      left: calc(30% + 15px);
    }

    .rotate:nth-of-type(30) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(30) .flip {
      left: calc(30% + 14px);
    }

    .rotate:nth-of-type(31) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(31) .flip {
      left: calc(30% + 11px);
    }

    .rotate:nth-of-type(32) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(32) .flip {
      left: calc(30% + 26px);
    }

    .rotate:nth-of-type(33) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(33) .flip {
      left: calc(30% + 37px);
    }

    .rotate:nth-of-type(34) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(34) .flip {
      left: calc(30% + 30px);
    }

    .rotate:nth-of-type(35) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(35) .flip {
      left: calc(30% + 27px);
    }

    .rotate:nth-of-type(36) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(36) .flip {
      left: calc(30% + 13px);
    }

    .rotate:nth-of-type(37) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(37) .flip {
      left: calc(30% + 28px);
    }

    .rotate:nth-of-type(38) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(38) .flip {
      left: calc(30% + 25px);
    }

    .rotate:nth-of-type(39) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(39) .flip {
      left: calc(30% + 30px);
    }

    .rotate:nth-of-type(40) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(40) .flip {
      left: calc(30% + 22px);
    }

    .rotate:nth-of-type(41) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(41) .flip {
      left: calc(30% + 29px);
    }

    .rotate:nth-of-type(42) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(42) .flip {
      left: calc(30% + 13px);
    }

    .rotate:nth-of-type(43) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(43) .flip {
      left: calc(30% + 31px);
    }

    .rotate:nth-of-type(44) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(44) .flip {
      left: calc(30% + 27px);
    }

    .rotate:nth-of-type(45) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(45) .flip {
      left: calc(30% + 27px);
    }

    .rotate:nth-of-type(46) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(46) .flip {
      left: calc(30% + 17px);
    }

    .rotate:nth-of-type(47) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(47) .flip {
      left: calc(30% + 37px);
    }

    .rotate:nth-of-type(48) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(48) .flip {
      left: calc(30% + 13px);
    }

    .rotate:nth-of-type(49) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(49) .flip {
      left: calc(30% + 38px);
    }

    .rotate:nth-of-type(50) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(50) .flip {
      left: calc(30% + 14px);
    }

    .rotate:nth-of-type(51) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(51) .flip {
      left: calc(30% + 16px);
    }

    .rotate:nth-of-type(52) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(52) .flip {
      left: calc(30% + 21px);
    }

    .rotate:nth-of-type(53) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(53) .flip {
      left: calc(30% + 39px);
    }

    .rotate:nth-of-type(54) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(54) .flip {
      left: calc(30% + 22px);
    }

    .rotate:nth-of-type(55) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(55) .flip {
      left: calc(30% + 31px);
    }

    .rotate:nth-of-type(56) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(56) .flip {
      left: calc(30% + 16px);
    }

    .rotate:nth-of-type(57) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(57) .flip {
      left: calc(30% + 12px);
    }

    .rotate:nth-of-type(58) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(58) .flip {
      left: calc(30% + 24px);
    }

    .rotate:nth-of-type(59) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(59) .flip {
      left: calc(30% + 24px);
    }

    .rotate:nth-of-type(60) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(60) .flip {
      left: calc(30% + 14px);
    }

    .rotate:nth-of-type(61) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(61) .flip {
      left: calc(30% + 35px);
    }

    .rotate:nth-of-type(62) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(62) .flip {
      left: calc(30% + 39px);
    }

    .rotate:nth-of-type(63) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(63) .flip {
      left: calc(30% + 20px);
    }

    .rotate:nth-of-type(64) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(64) .flip {
      left: calc(30% + 23px);
    }

    .rotate:nth-of-type(65) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(65) .flip {
      left: calc(30% + 16px);
    }

    .rotate:nth-of-type(66) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(66) .flip {
      left: calc(30% + 36px);
    }

    .rotate:nth-of-type(67) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(67) .flip {
      left: calc(30% + 11px);
    }

    .rotate:nth-of-type(68) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(68) .flip {
      left: calc(30% + 26px);
    }

    .rotate:nth-of-type(69) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(69) .flip {
      left: calc(30% + 38px);
    }

    .rotate:nth-of-type(70) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(70) .flip {
      left: calc(30% + 11px);
    }

    .rotate:nth-of-type(71) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(71) .flip {
      left: calc(30% + 30px);
    }

    .rotate:nth-of-type(72) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(72) .flip {
      left: calc(30% + 15px);
    }

    .rotate:nth-of-type(73) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(73) .flip {
      left: calc(30% + 17px);
    }

    .rotate:nth-of-type(74) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(74) .flip {
      left: calc(30% + 38px);
    }

    .rotate:nth-of-type(75) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(75) .flip {
      left: calc(30% + 14px);
    }

    .rotate:nth-of-type(76) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(76) .flip {
      left: calc(30% + 22px);
    }

    .rotate:nth-of-type(77) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(77) .flip {
      left: calc(30% + 19px);
    }

    .rotate:nth-of-type(78) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(78) .flip {
      left: calc(30% + 26px);
    }

    .rotate:nth-of-type(79) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(79) .flip {
      left: calc(30% + 25px);
    }

    .rotate:nth-of-type(80) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(80) .flip {
      left: calc(30% + 12px);
    }

    .rotate:nth-of-type(81) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(81) .flip {
      left: calc(30% + 34px);
    }

    .rotate:nth-of-type(82) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(82) .flip {
      left: calc(30% + 26px);
    }

    .rotate:nth-of-type(83) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(83) .flip {
      left: calc(30% + 27px);
    }

    .rotate:nth-of-type(84) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(84) .flip {
      left: calc(30% + 22px);
    }

    .rotate:nth-of-type(85) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(85) .flip {
      left: calc(30% + 25px);
    }

    .rotate:nth-of-type(86) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(86) .flip {
      left: calc(30% + 33px);
    }

    .rotate:nth-of-type(87) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(87) .flip {
      left: calc(30% + 26px);
    }

    .rotate:nth-of-type(88) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(88) .flip {
      left: calc(30% + 13px);
    }

    .rotate:nth-of-type(89) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(89) .flip {
      left: calc(30% + 13px);
    }

    .rotate:nth-of-type(90) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(90) .flip {
      left: calc(30% + 16px);
    }

    .rotate:nth-of-type(91) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(91) .flip {
      left: calc(30% + 16px);
    }

    .rotate:nth-of-type(92) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(92) .flip {
      left: calc(30% + 18px);
    }

    .rotate:nth-of-type(93) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(93) .flip {
      left: calc(30% + 15px);
    }

    .rotate:nth-of-type(94) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(94) .flip {
      left: calc(30% + 14px);
    }

    .rotate:nth-of-type(95) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(95) .flip {
      left: calc(30% + 32px);
    }

    .rotate:nth-of-type(96) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(96) .flip {
      left: calc(30% + 21px);
    }

    .rotate:nth-of-type(97) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(97) .flip {
      left: calc(30% + 36px);
    }

    .rotate:nth-of-type(98) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(98) .flip {
      left: calc(30% + 14px);
    }

    .rotate:nth-of-type(99) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(99) .flip {
      left: calc(30% + 24px);
    }

    .rotate:nth-of-type(100) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(100) .flip {
      left: calc(30% + 35px);
    }

    .rotate:nth-of-type(101) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(101) .flip {
      left: calc(30% + 17px);
    }

    .rotate:nth-of-type(102) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(102) .flip {
      left: calc(30% + 31px);
    }

    .rotate:nth-of-type(103) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(103) .flip {
      left: calc(30% + 23px);
    }

    .rotate:nth-of-type(104) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(104) .flip {
      left: calc(30% + 31px);
    }

    .rotate:nth-of-type(105) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(105) .flip {
      left: calc(30% + 17px);
    }

    .rotate:nth-of-type(106) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(106) .flip {
      left: calc(30% + 15px);
    }

    .rotate:nth-of-type(107) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(107) .flip {
      left: calc(30% + 39px);
    }

    .rotate:nth-of-type(108) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(108) .flip {
      left: calc(30% + 37px);
    }

    .rotate:nth-of-type(109) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(109) .flip {
      left: calc(30% + 15px);
    }

    .rotate:nth-of-type(110) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(110) .flip {
      left: calc(30% + 22px);
    }

    .rotate:nth-of-type(111) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(111) .flip {
      left: calc(30% + 29px);
    }

    .rotate:nth-of-type(112) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(112) .flip {
      left: calc(30% + 40px);
    }

    .rotate:nth-of-type(113) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(113) .flip {
      left: calc(30% + 12px);
    }

    .rotate:nth-of-type(114) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(114) .flip {
      left: calc(30% + 27px);
    }

    .rotate:nth-of-type(115) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(115) .flip {
      left: calc(30% + 31px);
    }

    .rotate:nth-of-type(116) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(116) .flip {
      left: calc(30% + 30px);
    }

    .rotate:nth-of-type(117) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(117) .flip {
      left: calc(30% + 37px);
    }

    .rotate:nth-of-type(118) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(118) .flip {
      left: calc(30% + 20px);
    }

    .rotate:nth-of-type(119) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(119) .flip {
      left: calc(30% + 18px);
    }

    .rotate:nth-of-type(120) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(120) .flip {
      left: calc(30% + 23px);
    }

    .rotate:nth-of-type(121) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(121) .flip {
      left: calc(30% + 37px);
    }

    .rotate:nth-of-type(122) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(122) .flip {
      left: calc(30% + 15px);
    }

    .rotate:nth-of-type(123) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(123) .flip {
      left: calc(30% + 20px);
    }

    .rotate:nth-of-type(124) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(124) .flip {
      left: calc(30% + 35px);
    }

    .rotate:nth-of-type(125) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(125) .flip {
      left: calc(30% + 15px);
    }

    .rotate:nth-of-type(126) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(126) .flip {
      left: calc(30% + 29px);
    }

    .rotate:nth-of-type(127) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(127) .flip {
      left: calc(30% + 40px);
    }

    .rotate:nth-of-type(128) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(128) .flip {
      left: calc(30% + 26px);
    }

    .rotate:nth-of-type(129) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(129) .flip {
      left: calc(30% + 34px);
    }

    .rotate:nth-of-type(130) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(130) .flip {
      left: calc(30% + 17px);
    }

    .rotate:nth-of-type(131) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(131) .flip {
      left: calc(30% + 11px);
    }

    .rotate:nth-of-type(132) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(132) .flip {
      left: calc(30% + 37px);
    }

    .rotate:nth-of-type(133) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(133) .flip {
      left: calc(30% + 35px);
    }

    .rotate:nth-of-type(134) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(134) .flip {
      left: calc(30% + 25px);
    }

    .rotate:nth-of-type(135) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(135) .flip {
      left: calc(30% + 30px);
    }

    .rotate:nth-of-type(136) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(136) .flip {
      left: calc(30% + 40px);
    }

    .rotate:nth-of-type(137) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(137) .flip {
      left: calc(30% + 38px);
    }

    .rotate:nth-of-type(138) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(138) .flip {
      left: calc(30% + 13px);
    }

    .rotate:nth-of-type(139) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(139) .flip {
      left: calc(30% + 26px);
    }

    .rotate:nth-of-type(140) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(140) .flip {
      left: calc(30% + 33px);
    }

    .rotate:nth-of-type(141) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(141) .flip {
      left: calc(30% + 20px);
    }

    .rotate:nth-of-type(142) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(142) .flip {
      left: calc(30% + 36px);
    }

    .rotate:nth-of-type(143) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(143) .flip {
      left: calc(30% + 12px);
    }

    .rotate:nth-of-type(144) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(144) .flip {
      left: calc(30% + 25px);
    }

    .rotate:nth-of-type(145) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(145) .flip {
      left: calc(30% + 17px);
    }

    .rotate:nth-of-type(146) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(146) .flip {
      left: calc(30% + 24px);
    }

    .rotate:nth-of-type(147) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(147) .flip {
      left: calc(30% + 28px);
    }

    .rotate:nth-of-type(148) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(148) .flip {
      left: calc(30% + 19px);
    }

    .rotate:nth-of-type(149) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(149) .flip {
      left: calc(30% + 29px);
    }

    .rotate:nth-of-type(150) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(150) .flip {
      left: calc(30% + 38px);
    }

    .rotate:nth-of-type(151) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(151) .flip {
      left: calc(30% + 39px);
    }

    .rotate:nth-of-type(152) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(152) .flip {
      left: calc(30% + 26px);
    }

    .rotate:nth-of-type(153) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(153) .flip {
      left: calc(30% + 11px);
    }

    .rotate:nth-of-type(154) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(154) .flip {
      left: calc(30% + 40px);
    }

    .rotate:nth-of-type(155) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(155) .flip {
      left: calc(30% + 31px);
    }

    .rotate:nth-of-type(156) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(156) .flip {
      left: calc(30% + 28px);
    }

    .rotate:nth-of-type(157) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(157) .flip {
      left: calc(30% + 23px);
    }

    .rotate:nth-of-type(158) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(158) .flip {
      left: calc(30% + 37px);
    }

    .rotate:nth-of-type(159) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(159) .flip {
      left: calc(30% + 16px);
    }

    .rotate:nth-of-type(160) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(160) .flip {
      left: calc(30% + 35px);
    }

    .rotate:nth-of-type(161) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(161) .flip {
      left: calc(30% + 12px);
    }

    .rotate:nth-of-type(162) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(162) .flip {
      left: calc(30% + 16px);
    }

    .rotate:nth-of-type(163) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(163) .flip {
      left: calc(30% + 21px);
    }

    .rotate:nth-of-type(164) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(164) .flip {
      left: calc(30% + 32px);
    }

    .rotate:nth-of-type(165) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(165) .flip {
      left: calc(30% + 28px);
    }

    .rotate:nth-of-type(166) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(166) .flip {
      left: calc(30% + 18px);
    }

    .rotate:nth-of-type(167) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(167) .flip {
      left: calc(30% + 22px);
    }

    .rotate:nth-of-type(168) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(168) .flip {
      left: calc(30% + 33px);
    }

    .rotate:nth-of-type(169) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(169) .flip {
      left: calc(30% + 20px);
    }

    .rotate:nth-of-type(170) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(170) .flip {
      left: calc(30% + 34px);
    }

    .rotate:nth-of-type(171) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(171) .flip {
      left: calc(30% + 37px);
    }

    .rotate:nth-of-type(172) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(172) .flip {
      left: calc(30% + 29px);
    }

    .rotate:nth-of-type(173) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(173) .flip {
      left: calc(30% + 19px);
    }

    .rotate:nth-of-type(174) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(174) .flip {
      left: calc(30% + 16px);
    }

    .rotate:nth-of-type(175) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(175) .flip {
      left: calc(30% + 17px);
    }

    .rotate:nth-of-type(176) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(176) .flip {
      left: calc(30% + 30px);
    }

    .rotate:nth-of-type(177) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(177) .flip {
      left: calc(30% + 31px);
    }

    .rotate:nth-of-type(178) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(178) .flip {
      left: calc(30% + 33px);
    }

    .rotate:nth-of-type(179) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(179) .flip {
      left: calc(30% + 31px);
    }

    .rotate:nth-of-type(180) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(180) .flip {
      left: calc(30% + 30px);
    }

    .rotate:nth-of-type(181) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(181) .flip {
      left: calc(30% + 12px);
    }

    .rotate:nth-of-type(182) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(182) .flip {
      left: calc(30% + 20px);
    }

    .rotate:nth-of-type(183) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(183) .flip {
      left: calc(30% + 17px);
    }

    .rotate:nth-of-type(184) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(184) .flip {
      left: calc(30% + 36px);
    }

    .rotate:nth-of-type(185) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(185) .flip {
      left: calc(30% + 30px);
    }

    .rotate:nth-of-type(186) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(186) .flip {
      left: calc(30% + 27px);
    }

    .rotate:nth-of-type(187) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(187) .flip {
      left: calc(30% + 29px);
    }

    .rotate:nth-of-type(188) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(188) .flip {
      left: calc(30% + 16px);
    }

    .rotate:nth-of-type(189) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(189) .flip {
      left: calc(30% + 39px);
    }

    .rotate:nth-of-type(190) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(190) .flip {
      left: calc(30% + 22px);
    }

    .rotate:nth-of-type(191) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(191) .flip {
      left: calc(30% + 17px);
    }

    .rotate:nth-of-type(192) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(192) .flip {
      left: calc(30% + 25px);
    }

    .rotate:nth-of-type(193) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(193) .flip {
      left: calc(30% + 17px);
    }

    .rotate:nth-of-type(194) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(194) .flip {
      left: calc(30% + 23px);
    }

    .rotate:nth-of-type(195) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(195) .flip {
      left: calc(30% + 35px);
    }

    .rotate:nth-of-type(196) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(196) .flip {
      left: calc(30% + 36px);
    }

    .rotate:nth-of-type(197) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(197) .flip {
      left: calc(30% + 38px);
    }

    .rotate:nth-of-type(198) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(198) .flip {
      left: calc(30% + 20px);
    }

    .rotate:nth-of-type(199) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(199) .flip {
      left: calc(30% + 24px);
    }

    .rotate:nth-of-type(200) .flip-pos {
      transform: translateY(30px);
    }

    .rotate:nth-of-type(200) .flip {
      left: calc(30% + 25px);
    }
  }
}
</style>

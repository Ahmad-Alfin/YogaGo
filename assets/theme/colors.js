const colors = {
  grey: (opacity = 1) => `rgba(109, 125, 154, ${opacity})`,
  green: (opacity = 1) => `rgba(94, 140, 113, ${opacity})`, // Sage Green untuk YogaGo
  white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  black: (opacity = 1) => `rgba(34, 34, 34, ${opacity})`,
  darkModeBlack: (opacity = 1) => `rgba(27, 27, 27, ${opacity})`,
  darkModeGreen: (opacity = 1) => `rgba(146, 186, 160, ${opacity})`,
}
export default colors;
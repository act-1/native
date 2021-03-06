@RunWith(JUnit4::class)
class AutomateScreenshotsTest {
  
  @Before
  fun setUp() {
    ActivityScenario.launch(MainActivity::class.java)
    Screengrab.setDefaultScreenshotStrategry(UiAutomatorScreenshotStrategy())
  }
  
  @Test
  fun captureScreen() {
    // Delay 500 millis for app launch to main screen
    Thread.sleep(500)
    Screengrab.screenshot("main_screen")
  }
}
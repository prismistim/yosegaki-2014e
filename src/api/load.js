import axios from 'axios'

const URL = 'https://script.googleusercontent.com/macros/echo?user_content_key=Z_l42m_AK0pKkte4rtOi_zulHp-8rwsCxVCsKe8o9uHAkFzy2cV7HnaEJCyu1_ket_9mw4x-vGO9TwerEKZdmKj2e0O-55QVm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKTlU8o-ISOnRed2z6KYd9msUiuys_VwEeIRM3fq-82JaIcPYiYgA4sYZpTak_o22Q&lib=MCBe-Y-Uo9wGPJSIi4--OZQa_c_o8YQ-H'

const report_data = []

export default {
  async fetch(id) {
    await axios.get(URL)
      .then((res) => {
        report_data.push(res.data)
        console.log(report_data)
        return report_data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  findReport(id) {
    console.log(report_data.find(el => el.id === id))
    return report_data.find(el => el.id === id)
  },
  asyncFind(id, callback) {
    setTimeout(() => {
      console.log(report_data.find(el => el.id === id))
      callback(report_data.find(el => el.id === id))
    }, 1000)
  }
}
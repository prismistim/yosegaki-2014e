<template lang="pug">
  .container
    h3.section-title Report bug
    form(name="report_form")
      .form-group
        label(for="username") Username
        input.form-control(type="text" name="username" placeholder="Enter username")
      .form-group
        label(for="version") Software Version
        input.form-control(type="text" name="version" placeholder="ex) 1.20")
      //- .form-group
      //-   label(for="category") Category
      //-   .form-check(name="category")
      //-     .btn-group-toggle(data-toggle="buttons")
      //-       label.btn.btn-outline-warning.form-check-label 
      //-         input(type="checkbox" autocomplete="off" name="category" value="bug")
      //-         | Bug
      //-       label.btn.btn-outline-danger.form-check-label
      //-         input(type="checkbox" autocomplete="off" name="category" value="crash") 
      //-         | Crash
      //-       label.btn.btn-outline-secondary.form-check-label
      //-         input(type="checkbox" autocomplete="off" name="category" value="request")
      //-         | Request
      //-       label.btn.btn-outline-secondary.form-check-label
      //-         input(type="checkbox" autocomplete="off" name="category" value="others")
      //-         | Others
      .form-group
        label(for="summary") Summary
        input.form-control(type="text" name="summary" placeholder="ex) xx을 선택하면 게임이 강제 종료된다 (Selecting xx will force the game to end.)")
        small#summaryHelp.form-text.text-muted 일람표시 시에 제목으로서 표시되므로 알기 쉽게 간결하게 기술해 주세요
      .form-group
        label(for="description") Description
        textarea.form-control(name="description" rows="5" placeholder="Enter details")
      .form-group
        button.btn.btn-block.btn-success#submitBtn(v-on:click="post_report") Submit
</template>

<script>
  import axios from 'axios'

  let date = new Date()

  const URL = 'https://script.googleusercontent.com/macros/echo?user_content_key=Z_l42m_AK0pKkte4rtOi_zulHp-8rwsCxVCsKe8o9uHAkFzy2cV7HnaEJCyu1_ket_9mw4x-vGO9TwerEKZdmKj2e0O-55QVm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKTlU8o-ISOnRed2z6KYd9msUiuys_VwEeIRM3fq-82JaIcPYiYgA4sYZpTak_o22Q&lib=MCBe-Y-Uo9wGPJSIi4--OZQa_c_o8YQ-H'

  const submitButton = document.getElementById('submitBtn')

  export default {
    data() {
      post_data: {}
    },
    methods() {
      post_report = () => {
        let form = document.forms.report_form
        let data = {
          username: form.username.value,
          version: form.version.value,
          category: ' ',
          summary: form.summary.value,
          description: form.description.value,
          report_date: date,
        }

        axios.post(URL, data)
          .then(() => {
          this.$emit('POST_COMPLETE')
        })
        this.$on('POST_COMPLETE', () => {
          router.push({ name: 'Home' })
          this.loading = false
        })
      }
    }
    
  }
</script>


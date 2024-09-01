<template>
    <div class="container">
      <div class="header">
        <p v-html=headerTitle class="header-title"></p>
        <p v-html=headerText class="header-text"></p>
      </div>
      <div class="answers-wrapper">
        <div v-for="answer in answers" :key="answer.text" v-bind:class="{ 'bg-green': answer.isCorrect, 'bg-red':  !answer.isCorrect }" class="answer-block">
          <div style="padding: 40px;">
            <p class="question">{{ answer.question }}</p>
            {{answer.text}}
          </div>
        </div>
      </div>
      <button class="button" @click="() => $router.push('/')">Пройти еще раз</button>  
    </div>
  </template>
  
  <script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        correctAnswers: null
      };
    },
    props: ['answers'],
    mounted() {
      this.correctAnswers = this.answers.filter((el) => el.isCorrect === true).length
    },
    computed: {
      headerTitle() {
        if (this.correctAnswers === this.answers.length)
          return 'Поздравляем'
        else if (this.correctAnswers === 0)
          return 'Упс :('
        else 
          return 'Хороший результат!'
      },
      headerText() {
        if (this.correctAnswers === this.answers.length)
          return 'Вы правильно ответили на все вопросы.<br>Вы действительно отлично разбираетесь в IT. '
        else if (this.correctAnswers === 0)
          return 'Вы неправильно ответили на все вопросы.<br>Нужно подучить теорию.'
        else 
          return `Вы ответили правильно на ${this.correctAnswers} ${this.correctAnswers === 1 ? 'вопрос' : this.correctAnswers < 5 ? 'вопроса' : 'вопросов'}.<br>Так держать!`
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
  }

  .answer-block {
    width: 886px;
    height: 163px;
    border-radius: 20px;
  }

  .question {
    font-weight: 700;
    font-size: 20px;
    line-height: 24.38px;
    margin: 0;
    margin-bottom: 15px;
  }

  .answer {
    font-weight: 400;
    font-size: 16px;
    line-height: 22.4px;
  }

  .bg-green {
    background-color: #E5F5E1;
  }

  .bg-red {
    background-color: #FFE0E0;
  }

  .header-title {
    font-weight: 800;
    font-size: 48px;
    line-height: 58.51px;
    margin: 0;
  }

  .header-text {
    font-weight: 400;
    font-size: 24px;
    line-height: 33.6px;
    margin: 0;
  }

  .header {
    align-self: start;
  }

  .answers-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .button {
    width: 220px;
    height: 54px;
    border-radius: 10px;
    background-color: #3300FF;
    color: white;
    font-weight: 700;
    font-size: 18px;
    line-height: 21.94px;
  }
</style>
  
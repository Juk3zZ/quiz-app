<template>
  <div class="container">
    <div class="header">
      <h1 class="header-text">
        Тестирование
      </h1>
    </div>
    <div class="test-wrapper">
      <div class="quiz">
        <h3>{{ currentQuestion.question }}</h3>
        <span v-for="answer in currentQuestion.answers" :key="answer.text" class="quiz-answers">
          <input v-model="selectedAnswer" class="radio-button" type="radio" name="answer" :value="answer" @change="handleSetAnswer(answer, currentQuestion)" />
          <label class="quiz-label" :for="answer">{{ answer.text }}</label>
        </span>
      </div>
    </div>
    <div class="progress-bar-wrapper">
      <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 16px; line-height: 19.5px;">
        <span>0</span>
        <span>{{ questionsCount }}</span>
      </div>
      <div  class="progress-bar">
        <div class="progress" :style="progressPersentage"></div>
      </div>
      <span style="font-weight: 700; font-size: 16px; line-height: 19.5px; text-align: end;" :style="progressPersentage">{{ currentQuestionNumber }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      quizData: null,
      questionIndex: 1, 
      currentQuestionNumber: 0,
      selectedAnswer: null,
      userAnswers: []
    };
  },
  computed: {
    currentQuestion() {
      return this.quizData ? this.quizData[this.currentQuestionNumber] : null
    },
    questionsCount() {
      return this.quizData.length
    },
    progressPersentage() {
      let procent = this.currentQuestionNumber / this.questionsCount * 100
      return `width: ${procent}%`
    }
  },
  methods: {
    async loadData() {
      try {
        const response = await fetch('/quiz.json');
        if (!response)
          return
        
        const { questions } = await response.json();
        this.quizData = this.randomizeQuestions(questions);
      } catch (error) {
        console.log(error)
      }
    },
    handleSetAnswer(selectedAnswer, question) {
      this.currentQuestionNumber ++
      this.userAnswers.push({...selectedAnswer, question: question.question})

      if (this.userAnswers.length === this.quizData.length) {
        this.$router.push({ path: '/results', query: { answers: this.userAnswers } });
      }
    },
    randomizeQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    array.forEach(question => {
      let answers = question.answers
      for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    })
    return array
}
  },

  mounted() {
    this.loadData()
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 886px;
  height: 682px;
  margin-top: 82px;
}

.header-text {
  font-weight: 800;
  font-size: 48px;
  line-height: 58.51px;
  text-align: left;
  margin: 0;
}

.test-wrapper {
  height: 528px;
  background-color: #F7F7F7;
  border-radius: 20px;
  padding: 40px 40px 0 40px;
}

.progress-bar-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.progress-bar {
  background-color: #F7F7F7;
  height: 12px;
  border-radius: 99px;
}

.progress {
  background-color: #3300FF;
  height: 100%;
  border-radius: 99px;
}

.quiz {
  display: flex;
  flex-direction: column;
  gap: 20px
}

.quiz h3 {
  margin: 0;
  font-weight: 700;
  font-size: 24px;
  line-height: 29.26px;
}

.quiz-label {
  margin-left: 20px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19.5px;
}
</style>

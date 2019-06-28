Vue.component ('register-form', {
    props : {},
    template : `
    <div>
    <div class="container">
    <div id="progress" :style="{width: progress}"></div>
   
    <ul :class="{'show-final': showFinal}">Thank you for your registration
      <li>Name: {{ registerSteps[0].value }}</li>
      <li>E-mail: {{ registerSteps[2].value }}</li>
      </ul>
    
    <div id="register">
      <i v-if="position === 0" class="previousButton fas fa-user"></i>
      <i v-else class="previousButton fas fa-arrow-left" @click="previousStep"></i>
      <i class="forwardButton fas fa-arrow-right" @click="checkStep"></i>
      <div id="inputContainer" :class="{'showContainer': showContainer}">
        <form @submit.prevent="checkStep">
          <input id="inputField" :type="inputType" v-model="inputValue" ref="registerinput" required />
          <label id="inputLabel">{{ inputLabel }}</label>
        </form>
        <div id="inputProgress"></div>
      </div>
    </div>
    
  </div>
  
  </div>
    `,
    data(){
        return {
            position: 0,
            inputLabel: '',
            inputType: 'text',
            inputValue: '',
            showContainer: false,
            showFinal: false,
            progress: '0%',
            registerSteps: [
              {
                label: "What's your first name?",
                type: "text",
                value: "",
                pattern: /.+/
              },
              {
                label: "What's your last name?",
                type: "text",
                value: "",
                pattern: /.+/
              },
              {
                label: "What's your email?",
                type: "text",
                value: "",
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
              },
              {
                label: "Create your password",
                type: "password",
                value: "",
                pattern: /.+/
              }
            ]

        }
    },
    methods:{

        setStep() {
            this.inputLabel = this.registerSteps[this.position].label;
            this.inputType = this.registerSteps[this.position].type;
            this.inputValue = this.registerSteps[this.position].value;
            this.$refs.registerinput.focus();
            this.showStep();
          },
          showStep() {
            setTimeout(() => {
              this.showContainer = true;
            }, 100)
          },
          hideStep(callback) {
            this.showContainer = false;
            setTimeout(callback, 100);
          },
          previousStep() {
            this.position -= 1;
            register.className = '';
            this.hideStep(this.setStep);
            this.setProgress();
          },
          checkStep() {
            if(!this.registerSteps[this.position].pattern.test(this.inputValue)) {
              register.classList.add('wrong');
              register.classList.add('wronganimation');
              setTimeout(() => {
                register.classList.remove('wronganimation');
              }, 500);
              this.$refs.registerinput.focus();
            }
            else {
              register.className = '';
              register.classList.add('okanimation');
              setTimeout(() => {
                register.classList.remove('okanimation');
              }, 200);
    
              this.registerSteps[this.position].value = this.inputValue;
    
              this.position += 1;
              if(this.registerSteps[this.position]) {
                this.hideStep(this.setStep);
              }
              else {
                this.hideStep(() => {
                  register.className = 'close';
                  setTimeout(() => {
                    this.showFinal = true;
                  }, 1000);
                });
              }
            }
    
            this.setProgress();
          },
          setProgress() {
            this.progress = (this.position / this.registerSteps.length * 100) + '%';
          }

    },
    mounted(){
        let register = document.getElementById('register');

      this.setStep();

    }
})

var app = new Vue({
    el : '#app',
    data :  { },
        methods : { }
        
})
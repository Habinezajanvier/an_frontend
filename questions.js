$(document).ready(()=>{
    let questions = $('.questions');
    let display;
    
    //displaying the response about the submitted answer
    let displayAnswer = (q_id, answer) => {
        display = [answer.msg]
        console.log(display);

        $('.feedback').html(display);
    };

    let loadData = (question) => {
        
        let ids = question._id

        //subimitting the choice for correction
        const formSubmission = (e) => {
            e.preventDefault();
            let myChoice = $(`#${ids}`).children("input[name ='choice']:checked");
            if (myChoice.length == 0) {
                console.log(`you submit unanswered question `)
            }else{
                let answer = myChoice.val();
                //console.log(choice);

                fetch('http://localhost:5000/anesthesia/question/answer',{
                    method: "POST",
                    headers: {
                        "accept": "application/json, texp/plain",
                        "content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        question: question.question,
                        answer: answer
                    })
                })
                .then(res => res.json())
                .then(data => {
                    display = "";
                    displayAnswer(ids, data);
                });
            }
            
        }

        //for question with only 3 choices
        if (Object.keys(question.choices).length ==3) {
            $(".questions").append(`
                ${question.question}
                <form id = ${ids}>
                    
                    <input type = 'radio' value = '${question.choices.a}' name = 'choice'>
                        ${question.choices.a}<br>
                    <input type = 'radio' value = '${question.choices.b}' name = 'choice'>
                        ${question.choices.b}<br>
                    <input type = 'radio' value = '${question.choices.c}' name = 'choice'>
                        ${question.choices.c}<br>
                    <input type = 'submit' value = 'submit your answer'>
                </form>
            `);
           $(`#${ids}`).on('submit', formSubmission);
        }

        //for question with only 4 choices
        if (Object.keys(question.choices).length ==4) {
            $(".questions").append(`
                ${question.question}
                <form id = ${ids}>
                    
                    <input type = 'radio' value = '${question.choices.a}' name = 'choice'>
                        ${question.choices.a}<br>
                    <input type = 'radio' value = '${question.choices.b}' name = 'choice'>
                        ${question.choices.b}<br>
                    <input type = 'radio' value = '${question.choices.c}' name = 'choice'>
                        ${question.choices.c}<br>
                    <input type = 'radio' value = '${question.choices.d}' name = 'choice'>
                        ${question.choices.d}<br>
                    <input type = 'submit' value = 'submit your answer'>
                </form>
            `);
            $(`#${ids}`).on('submit', formSubmission);
            
        }

        //for question with only 5 choices
        if (Object.keys(question.choices).length ==5) {
            $(".questions").append(`
                ${question.question}
                <form id = ${ids}>
                    
                    <input type = 'radio' value = '${question.choices.a}' name = 'choice'>
                        ${question.choices.a}<br>
                    <input type = 'radio' value = '${question.choices.b}' name = 'choice'>
                        ${question.choices.b}<br>
                    <input type = 'radio' value = '${question.choices.c}' name = 'choice'>
                        ${question.choices.c}<br>
                    <input type = 'radio' value = '${question.choices.d}' name = 'choice'>
                        ${question.choices.d}<br>
                    <input type = 'radio' value = '${question.choices.e}' name = 'choice'>
                        ${question.choices.e}<br>
                    <input type = 'submit' value = 'submit your answer'>
                </form>
            `);
            $(`#${ids}`).on('submit', formSubmission);  
        }
    }
    
    const get_questions = () =>{
        return fetch('http://localhost:5000/anesthesia/question')
        .then (res => res.json())
        .then((data) => {
            data.forEach(question => {
                ids = question._id;
                loadData(question);
            });
        });
    };

    get_questions();
})
// sukuriu savo serveri
const express = require('express');
const app = express();

// duomenys bus perduodami ir gaunami json formatu
app.use(express.json());

const courses = [
    {id: 1, name: "js", youTube_Channel: "CS Dojo"},
    {id: 2, name: "react", youTube_Channel: "Derek Banas"},
    {id: 3, name: "node js", youTube_Channel: "Joshua Fluke"}
]

app.get('/api/courses', (req, res) => {
    res.send(courses)
});


app.get('/api/courses/:id', (req, res) => {
    const my_course = courses.find(item => item.id === parseInt(req.params.id));
    if(!my_course) res.status(404).send("not found");
    res.send(my_course);
});

app.post('/api/courses/:id', (req, res) => {
    const my_course = {
        id: courses.length +1,
        name: req.body.name,
        youTube_Channel: req.body.youTube_Channel
    };

    courses.push(my_course);
    res.send(courses);
})

app.put('/api/courses/:id', (req, res) => {
    const my_course = courses.find(item => item.id === parseInt(req.params.id));
    if(!my_course) res.status(404).send("not found");

    my_course.name = req.body.name,
    my_course.youTube_Channel = req.body.youTube_Channel;

    res.send(courses);
})

app.delete('/api/courses/:id', (req, res) => {
    const my_course = courses.find(item => item.id === parseInt(req.params.id));
    if(!my_course) res.status(404).send("not found");

    const course_index = courses.indexOf(my_course);
    courses.splice(course_index, 1);

    res.send(my_course)
})


// portas ant kurio veiks serveris
const PORT = 9000;

app.listen(PORT, () => {
    console.log(`Server is runing on ${PORT}`)
});
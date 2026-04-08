const express = require('express'); 
const app = express(); 
app.use(express.json()); // Обов'язково для роботи з JSON

const items = [
    { "id": 1, "name": "Товар 1", "price": 100 }, 
    { "id": 2, "name": "Товар 2", "price": 200 }]

app.get("/", (req, res) => {
    res.send("Вітаю на сервері!")
})

app.get("/items", (req, res) => {
    res.json(items)
})

app.get("/items/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
	const item = items.find((n) => n.id === id);
    if(!item){
        return res.status(404).json({ error: "Item not found" });
    }
    res.json(item)
})

app.post("/items", (req, res) => {
    const { id, name, price } = req.body;

    const item = { id, name, price };
	items.push(item);
	res.status(201).json(item);
})

app.put("/items/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
	const { name, price } = req.body;
    const idx = items.findIndex((n) => n.id === id);
    const updatedItem = { id, name, price };
    items[idx] = updatedItem;
    res.json(updatedItem)
})

app.delete("/items/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
	const idx = items.findIndex((n) => n.id === id);
    items.splice(idx, 1);
	res.status(204).send();
})



app.listen(3000, () => {
	console.log("Сервер працює!");
});
var db = require('../models');

// GET /api/lists
function index(req, res) {
  // access database and pull out all lists
  db.List.find({}, function(err, allLists) {
    res.json(allLists);
  });
}

// POST /api/lists
function create(req, res) {
  // create an list based on request body and send it back as JSON
  var inputList = req.body;
  //test input being submitted to db
  // console.log(inputList);

  db.List.create(inputList, function(err, list){
    if (err) {console.log('error', err);}
    // console.log(list);
    res.json(list);
  });
}

// GET /api/lists/:listId
function show(req, res) {
  // find one list by id and send it back as JSON
  db.List.findOne({listName: req.params.listName}, function (err, foundList) {
      if (err){ console.log(err);}
      db.Todo.find({_list: foundList._id}, function(err, todosForList){
        jsonPayload = foundList.toObject();
        jsonPayload.todos = todosForList;
        // console.log(jsonPayload);
        res.json(jsonPayload);
      })
    });
};

// DELETE /api/lists/:listId
function destroy(req, res) {
  // find one list by id, delete it, and send it back as JSON
  db.List.findByIdAndRemove(req.params.list_id, function(err, deletedList) {
    console.log(deletedList);
    if (err) { console.log('error', err); }
    res.send(200);
  });
};

// PUT or PATCH /api/lists/:listId
function update(req,res) {

}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};

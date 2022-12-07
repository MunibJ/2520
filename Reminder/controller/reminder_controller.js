let database = require("../database").database
let usermodel = require("../database").userModel;

let remindersController = {
  list: (req, res) => {
    const userid = usermodel.findById(req.user.id);
    res.render("reminder/index", { reminders: userid.reminders });
    
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    const userid = usermodel.findById(req.user.id);
    let reminderToFind = req.params.id;
    let searchResult = userid.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: userid.reminders });
    }
  },

  create: (req, res) => {
    // Implement this code
    const user = userModel.findById(req.user.id);
    let reminder = {
      id: user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed == "true",
    };
    user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    const userid = usermodel.findById(req.user.id);
    let reminderToFind = req.params.id;
    let searchResult = userid.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/edit", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: userid.reminders });
    }
  },

  update: (req, res) => {
    // implement this code
    const user = usermodel.findById(req.user.id);
    let reminderToFind = req.params.id;
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    }
    );
    searchResult.title = req.body.title;
    searchResult.description = req.body.description;
    searchResult.completed = req.body.completed == "true";
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // Implement this code
    const user = usermodel.findById(req.user.id);
    let reminderToFind = req.params.id;
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    }
    );
    let index = user.reminders.indexOf(searchResult);
    user.reminders.splice(index, 1);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;

Items = new Meteor.Collection("items");

UI.body.items = Items.find({}, {sort: {rank: 1}});

UI.body.rendered = function () {
  $("#list").sortable({
    stop: function(event, ui) {
      var el = ui.item.get(0), before = ui.item.prev().get(0), after = ui.item.next().get(0);

      var newRank;
      if(!before)     newRank = after.$ui.data().rank - 1;
      else if(!after) newRank = before.$ui.data().rank + 1;
      else            newRank = (before.$ui.data().rank + after.$ui.data().rank) / 2;

      Items.update(el.$ui.data()._id, {$set: {rank: newRank}});
    }
  });
};

if (Meteor.isServer) {
  if(Items.find().count() === 0) {
    _.each(
      ["ASM", "C", "C++", "PHP", "Ruby", "Javascript", "Basic"],
      function(text, index) { Items.insert({text: text, rank: index}); }
    );
  }
}

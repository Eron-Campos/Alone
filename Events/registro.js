module.exports = async (client, user, database) => {
  let dbref = database.ref(`Hero/${user.id}`);
  let db = await database.ref(`Hero/${user.id}`).once('value');

  let db1ref = database.ref(`Economia/${user.id}`);
  let db1 = await database.ref(`Economia/${user.id}`).once('value');

  let db2ref = database.ref(`Itens/${user.id}`);
  let db2 = await database.ref(`Itens/${user.id}`).once('value');
  if(db.val() != null || db1.val() != null || db2.val() != null) return;

  if(db.val() == null || db1.val() == null || db2.val() == null) {
    dbref.set({xp: 0, lvl: 1, strength: 5, speed: 5, defense: 5, life: 100})
    db1ref.set({balance: 0})
    db2ref.set({gasha: 0,sword1: false, shield1: false, shoes1: false})
    return;
  }
}
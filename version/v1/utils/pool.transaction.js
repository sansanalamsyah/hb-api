
exports.inTransaction = (pool, body, callback) => {
    
    withConnection(pool, function(db, done) {

        db.beginTransaction(function(err) {
            if (err) return done(err);

            body(db, finished)
            
        })

        function finished(err) {
            
            var context = this;
            var args = arguments;

            if (err) {
                if (err == 'rollback') {
                    args[0] = err = null;
                }
                db.rollback(function() { done.apply(context, args) });
            } else {
                db.commit(function(err) {
                    args[0] = err;
                    done.apply(context, args)
                })
            }
        }
    }, callback)
}

function withConnection(pool, body, callback) {
    
    pool.getConnection(function(err, db) {
        if (err) return callback(err);

        body(db, finished);

        function finished() {
            db.release();
            
            callback.apply(this, arguments);
        }
    })
}
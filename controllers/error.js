exports.errorPage = (req, res) => {
    //TODO: Make startscreen
    res.render('errorPage', {error: "Page does not exist"});
}

const db = require('../models');
module.exports = function (app) {
    let currentCategories = [];

    app.get('/', function (req, res) {
        res.locals.metaTags = {
            title: 'Something Borrowed',
            description: 'Helping you save money through friend-to-friend lending; don\'t buy when you can borrow!',
            keywords: 'lending, borrow, friend-to-friend, save'
        };
        let desiredMenu;
        if (req.cookies.userid) {
            desiredMenu = {
                home: '<li class="currentPage"><a href="/">Home</a></li>',
                profile: '<li><a href="/profile">Profile</a></li>',
                items: '<li><a href="/items">Items</a></li>',
                signOut: '<button onclick="signOut();">Sign Out</button>'
            };
            res.render('index', {
                navData: desiredMenu
            });
        } else {
            desiredMenu = {
                home: '<li class="currentPage"><a href="/">Home</a></li>',
                items: '<li><a href="/items">Items</a></li>',
                signIn: '<button data-toggle="modal" data-target="#signInModal">Sign In</button>'
            };
            res.render('index', {
                navData: desiredMenu
            });
        }
    });

    app.get('/profile', function (req, res) {
        const userId = req.cookies.userid;
        db.User.findOne({ where: {userIdToken: userId}, include: [db.Group, db.Item] }).then(dbUser => {
          console.log('all results 1'+ JSON.stringify(dbUser));
          const groupIds = dbUser.Groups.map(group => group.groupId);
          console.log(groupIds);
          console.log('all results 2'+ JSON.stringify(dbUser.Items));
          console.log('all results 2'+ JSON.stringify(dbUser.Groups));
          db.ItemRequest.findAll({ where: {owner: userId}}).then(function (dbRequest) {
                    console.log(JSON.stringify(dbRequest));
                    let pendingRequests = [];
                    let confirmedRequests = [];
                    let deniedRequests = [];
                    for (let i = 0; i < dbRequest.length; i++) {
                        if (dbRequest[i].dataValues.confirmed === false) {
                            pendingRequests.push(dbRequest[i].dataValues);
                        } else if (dbRequest[i].dataValues.confirmed === true || dbRequest[i].dataValues.denied === true) {
                            confirmedRequests.push(dbRequest[i].dataValues);
                        } else if (dbRequest[i].dataValues.denied === true) {
                            deniedRequests.push(dbRequest[i].dataValues);
                        }
                    }
              res.locals.metaTags = {
                title: dbUser.userName + '\'s Profile',
                description: 'See all your items available to borrow and add new items',
                keywords: 'lending, borrow, friend-to-friend, save, view items, add items'
            };
            let desiredMenu;
            if (userId) {
                desiredMenu = {
                    home: '<li><a href="/">Home</a></li>',
                    profile: '<li class="currentPage"><a href="/profile">Profile</a></li>',
                    items: '<li><a href="/items">Items</a></li>',
                    signOut: '<button onclick="signOut();">Sign Out</button>'
                };
                res.render('profile', { navData: desiredMenu, user: dbUser, items: dbUser.Items, groups: dbUser.Groups, pending: pendingRequests, confirmed: confirmedRequests, denied: deniedRequests});
            } else {
                desiredMenu = {
                    home: '<li><a href="/">Home</a></li>',
                    items: '<li><a href="/items">Items</a></li>',
                    signIn: '<button data-toggle="modal" data-target="#signInModal">Sign In</button>'
                };
                res.render('unauthorized', { navData: desiredMenu, msg: 'You must be signed in to view your profile.' });
            }
          });
        });


        // db.User.findAll({ where: { userIdToken: userId }, include: db.Item}).then(function (dbUser) {
        //     console.log('all results'+ JSON.stringify(dbUser[0].dataValues.Items));
        //     console.log('returned' + dbUser[0].dataValues.userName);
        //     db.ItemRequest.findAll({ where: {owner: userId}}).then(function (dbRequest) {
        //         console.log(JSON.stringify(dbRequest));
        //         let pendingRequests = [];
        //         let confirmedRequests = [];
        //         let deniedRequests = [];
        //         for (let i = 0; i < dbRequest.length; i++) {
        //             if (dbRequest[i].dataValues.confirmed === false) {
        //                 pendingRequests.push(dbRequest[i].dataValues);
        //             } else if (dbRequest[i].dataValues.confirmed === true || dbRequest[i].dataValues.denied === true) {
        //                 confirmedRequests.push(dbRequest[i].dataValues);
        //             } else if (dbRequest[i].dataValues.denied === true) {
        //                 deniedRequests.push(dbRequest[i].dataValues);
        //             }
        //         }
        //         console.log('pending ' + JSON.stringify(pendingRequests));
        //         res.locals.metaTags = {
        //             title: dbUser[0].dataValues.userName + '\'s Profile',
        //             description: 'See all your items available to borrow and add new items',
        //             keywords: 'lending, borrow, friend-to-friend, save, view items, add items'
        //         };
        //         let desiredMenu;
        //         if (userId) {
        //             desiredMenu = {
        //                 home: '<button><a href="/">Home</a>',
        //                 items: '<button><a href="/items">Items</a></button>',
        //                 signOut: '<button onclick="signOut();">Sign Out</button>'
        //             };
        //             res.render('profile', { navData: desiredMenu, user: dbUser[0].dataValues, items: dbUser[0].dataValues.Items, pending: pendingRequests, confirmed: confirmedRequests, denied: deniedRequests });
        //         } else {
        //             desiredMenu = {
        //                 home: '<button><a href="/">Home</a>',
        //                 items: '<button><a href="/items">Items</a></button>',
        //                 signIn: '<button data-toggle="modal" data-target="#signInModal">Sign In</button>'
        //             };
        //             res.render('unauthorized', { navData: desiredMenu, msg: 'You must be signed in to view your profile.' });
        //         }
        //     });

        // });
    });

    app.get('/profile/new', function (req, res) {
        const userId = req.cookies.userid;
        db.User.findAll({ where: { userIdToken: userId } }).then(function (dbUser) {
            res.locals.metaTags = {
                title: 'Create Profile',
                description: 'Complete your new profile so you can save money through friend-to-friend lending',
                keywords: 'lending, borrow, friend-to-friend, save'
            };
            let desiredMenu;
            if (userId) {
                desiredMenu = {
                    home: '<li><a href="/">Home</a></li>',
                    items: '<li><a href="/items">Items</a></li>',
                    signOut: '<button onclick="signOut();">Sign Out</button>'
                };
                res.render('createProfile', {
                    navData: desiredMenu,
                    user: dbUser[0].dataValues
                });
            } else {
                desiredMenu = {
                    home: '<li><a href="/">Home</a></li>',
                    items: '<li><a href="/items">Items</a></li>',
                    signIn: '<button data-toggle="modal" data-target="#signInModal">Sign In</button>'
                };
                res.render('unauthorized', { navData: desiredMenu, msg: 'You must sign in with Google before being able to complete your profile.'});
            }
        });
    });

    app.get('/items', function (req, res) {
        const userId = req.cookies.userid;
        db.User.findOne({ include: db.Group }).then(dbUser => {
            const groupIds = dbUser.Groups.map(group => group.groupId);
            console.log(groupIds);
            db.Group.findAll({
                where: {
                    groupId: groupIds
                },
                include: db.Item
            }).then(dbGroups => {
              console.log(dbGroups);
                console.log(dbGroups[0].Items);
                // Render here. dbGroups is an array of groups. Groups has an array of Items.
                let desiredMenu;
                if (userId) {
                    desiredMenu = {
                        home: '<li><a href="/">Home</a></li>',
                        profile: '<li><a href="/profile">Profile</a></li>',
                        items: '<li class="currentPage"><a href="/items">Items</a></li>',
                        signOut: '<button onclick="signOut();">Sign Out</button>'
                    };
                    res.render('items', {
                        navData: desiredMenu,
                        // items: dbItems,
                        categories: currentCategories
                    });
                } else {
                    desiredMenu = {
                        home: '<li><a href="/">Home</a></li>',
                        items: '<li class="currentPage"><a href="/items">Items</a></li>',
                        signIn: '<button data-toggle="modal" data-target="#signInModal">Sign In</button>'
                    };
                    res.render('items', {
                        navData: desiredMenu,
                        // items: dbItems,
                        categories: currentCategories
                    });
                }
            });
        });
        // db.Item.findAll({}).then(function (dbItems) {
        //     console.log('check here ' + JSON.stringify(dbItems));
        //     for (let i = 0; i < dbItems.length; i++) {
        //         if (currentCategories.includes(dbItems[i].itemCategory) === false) {
        //             currentCategories.push(dbItems[i].itemCategory);
        //         }
        //     }
        //     console.log(currentCategories);

        // });
    });

    app.get('/items/:category', function (req, res) {
        const userId = req.cookies.userid;
        const selectedCategory = req.params.category;
        console.log(selectedCategory);
        db.Item.findAll({ where: { itemCategory: selectedCategory } }).then(function (dbItems) {
            let desiredMenu;
            if (userId) {
                desiredMenu = {
                    home: '<li><a href="/">Home</a></li>',
                    profile: '<li><a href="/profile">Profile</a></li>',
                    items: '<li><a href="/items">Items</a></li>',
                    signOut: '<button onclick="signOut();">Sign Out</button>'
                };
                res.render('items', {
                    navData: desiredMenu,
                    items: dbItems,
                    categories: currentCategories
                });
            } else {
                desiredMenu = {
                    home: '<li><a href="/">Home</a></li>',
                    items: '<li><a href="/items">Items</a></li>',
                    signIn: '<button data-toggle="modal" data-target="#signInModal">Sign In</button>'
                };
                res.render('items', {
                    navData: desiredMenu,
                    items: dbItems,
                    categories: currentCategories
                });
            }
        });
    });

    app.get('/search/:query', function (req, res) {
        const userId = req.cookies.userid;
        const searchQuery = req.params.query;
        console.log(`html route ${searchQuery}`);
        db.Item.findAll({ where: { itemName: searchQuery } }).then(function (dbSearch) {
            let desiredMenu;
            if (userId) {
                desiredMenu = {
                    home: '<li><a href="/">Home</a></li>',
                    profile: '<li><a href="/profile">Profile</a></li>',
                    items: '<li><a href="/items">Items</a></li>',
                    signOut: '<button onclick="signOut();">Sign Out</button>'
                };
                if (dbSearch.length > 0) {
                    console.log(dbSearch);
                    res.render('searchResults', {
                        navData: desiredMenu,
                        searchResults: dbSearch
                    });
                } else {
                    res.render('searchResults', {
                        navData: desiredMenu,
                        noResults: '<h3>Your query returned no results.</h3>'
                    });
                }
            } else {
                desiredMenu = {
                    home: '<li><a href="/">Home</a></li>',
                    items: '<li><a href="/items">Items</a></li>',
                    signIn: '<button data-toggle="modal" data-target="#signInModal">Sign In</button>'
                };
                if (dbSearch.length > 0) {
                    console.log(dbSearch);
                    res.render('searchResults', {
                        navData: desiredMenu,
                        searchResults: dbSearch
                    });
                } else {
                    res.render('searchResults', {
                        navData: desiredMenu,
                        noResults: '<h3>Your query returned no results.</h3>'
                    });
                }
            }
        });
    });

    app.get('*', function (req, res) {
        res.locals.metaTags = {
            title: 'Error',
            description: 'Page not found.',
            keywords: 'error'
        };
        let desiredMenu;
        if (req.cookies.userid) {
            desiredMenu = {
                home: '<li><a href="/">Home</a></li>',
                profile: '<li><a href="/profile">Profile</a></li>',
                items: '<li><a href="/items">Items</a></li>',
                signOut: '<button onclick="signOut();">Sign Out</button>'
            };
            res.render('404', { navData: desiredMenu });
        } else {
            desiredMenu = {
                home: '<li><a href="/">Home</a></li>',
                items: '<li><a href="/items">Items</a></li>',
                signIn: '<button data-toggle="modal" data-target="#signInModal">Sign In</button>'
            };
            res.render('404', { navData: desiredMenu });
        }
    });


};

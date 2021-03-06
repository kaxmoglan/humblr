let db = {
  users: [
    {
      userId: "PA6W8tFiPRWqDacDhtFdVdTiS1S2",
      email: "user@email.com",
      username: "username",
      createdAt: "2020-10-07T14:42:49.930Z",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/humblr-sm.appspot.com/o/LzuwSgvvbtokCAB9bZRcR.jpg?alt=media",
      bio: "This is the user's bio",
      website: "https://www.userwebsite.com",
      location: "London, UK",
    },
  ],
  murmurs: [
    {
      username: "username",
      body: "This is the murmur",
      createdAt: "2020-10-07T14:42:49.930Z",
      likeCount: 5,
      commentCount: 3,
    },
  ],
  comments: [
    {
      username: "username",
      murmurId: "kdjsfgdksuufhgkdsufky",
      body: "nice one mate!",
      createdAt: "2019-03-15T10:59:52.798Z",
    },
  ],
  notifications: [
    {
      recipient: "username",
      sender: "John",
      read: true || false,
      screamId: "kdjsfgdksuufhgkdsufky",
      type: "like | comment",
      createdAt: "2020-10-07T14:42:49.930Z",
    },
  ],
};

const userDetails = {
  // Redux data
  credentials: {
    userId: "N43KJ5H43KJHREW4J5H3JWMERHB",
    email: "user@email.com",
    handle: "user",
    createdAt: "2019-03-15T10:59:52.798Z",
    imageUrl: "image/dsfsdkfghskdfgs/dgfdhfgdh",
    bio: "Hello, my name is user, nice to meet you",
    website: "https://user.com",
    location: "Lonodn, UK",
  },
  likes: [
    {
      userHandle: "user",
      screamId: "hh7O5oWfWucVzGbHH2pa",
    },
    {
      userHandle: "user",
      screamId: "3IOnFoQexRcofs5OhBXO",
    },
  ],
};

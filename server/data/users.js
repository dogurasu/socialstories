import bcrypt from 'bcryptjs';

const users = [
    {
        name: "Doug P",
        username: "dogurasu",
        summary: `
        Hi! I'm Doug P (a.k.a. dogurasu), the owner of SocialStory. I built this platform to promote/encourage my peers to spend their social media time on practicing their writing skills by increasing the amount of effort spent on writing social media material. That's why I created SocialStory: so that people could write more meaningful things on social media. Feel free to reach out if you have any ideas/opinions you want to share on SocialStory.`,
        email: "ex@ex.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name: "Cali Kemperton",
        username: "caliK123",
        summary: `
        Hey all! Cali K. here. I was brought onto SocialStory via my good friend Doug and I'm really liking it! Check out my story posts!
        `,
        email: "caliK@ex.com",
        password: bcrypt.hashSync("123456", 10),
    },
    {
        name: "John Cruiser",
        username: "jTheCruiser",
        summary: `
        Hi there. My name is John Cruiser and I'm one of the first members of SocialStory. Please check out my stories. I hope to see you around.
        `,
        email: "johnC@ex.com",
        password: bcrypt.hashSync("123456", 10),
    }
]

export default users;
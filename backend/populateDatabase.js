import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import Author from './models/Authors.js';
import BlogPost from './models/BlogPosts.js';

dotenv.config();

const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const uri = `mongodb+srv://${username}:${password}@cluster0.dhchqcf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const generateAuthors = (num) => {
  const authors = [];
  for (let i = 0; i < num; i++) {
    const author = new Author({
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      email: faker.internet.email(),
      birthDate: faker.date.past({ years: 50, refDate: new Date(2000, 0, 1) }).toISOString().split('T')[0],
      avatar: `https://picsum.photos/seed/${faker.number.int()}/200/200`, // URL dinamico di Picsum
    });
    authors.push(author);
  }
  return authors;
};


const generateBlogPosts = (num, authors) => {
  const blogPosts = [];
  for (let i = 0; i < num; i++) {
    const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
    const blogPost = new BlogPost({
      category: faker.commerce.department(),
      title: faker.lorem.sentence(),
      cover: `https://picsum.photos/seed/${faker.number.int()}/800/600`,
      readTime: {
        value: faker.number.int({ min: 1, max: 15 }), // Usa faker.number.int() per numeri interi
        unit: 'minutes',
      },
      author: `${faker.person.firstName() } ${faker.person.lastName()}`,
      content: faker.lorem.paragraphs(),
    });
    blogPosts.push(blogPost);
  }
  return blogPosts;
};


const populateDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      // Opzioni deprecate rimosse
    });
    console.log('MongoDB connected for population');

    await Author.deleteMany({});
    await BlogPost.deleteMany({});

    const authors = generateAuthors(30); // Usa un numero maggiore per avere abbastanza dati
    const blogPosts = generateBlogPosts(30, authors); // Correlati ai nuovi autori

    await Author.insertMany(authors);
    console.log('Authors added');

    await BlogPost.insertMany(blogPosts);
    console.log('BlogPosts added');

    mongoose.connection.close();
    console.log('Database population complete and connection closed');
  } catch (error) {
    console.error('Error populating database: ', error);
  }
};

populateDatabase();

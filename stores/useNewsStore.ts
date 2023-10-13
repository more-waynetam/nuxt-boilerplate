import { defineStore } from 'pinia'

interface News {
  title: string;
  content: string;
  date: number;
}

export const useNewsStore = defineStore('newsStore', () =>{
  const getNews = async ():Promise<News[]> => {
    const sampleData:News[]=[
          {
              title: 'title',
              content: 'content',
              date: Date.now()
          },
          {
              title: 'title2',
              content: 'content2',
              date: Date.now()
          },
      ];
    return new Promise((resolve, reject) => {
      resolve(sampleData);
    })
  }
  return {getNews};
})
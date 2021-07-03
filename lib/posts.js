import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import html from 'remark-html'
import remark from 'remark'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData(){
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '') //remove .md extension with regex
        
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        const matterResult = matter(fileContents)

        return {
            id,
            ...matterResult.data
        };
    })

    const sortedPostsData = allPostsData.sort(({date: a}, {date: b}) => {
        if(a < b){
            return 1;
        } else if(a > b){
            return -1;
        } else {
            return 0;
        }
    });
    
    console.log(sortedPostsData);
    return sortedPostsData;
}

export function getAllPostsId(){
    const fileNames = fs.readdirSync(postsDirectory)

    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id){
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    const processedContent = await remark().use(html).process(matterResult.content) 
    const contentHtml = processedContent.toString()

    /*
    console.log(matterResult)
    console.log({...matterResult})
    */  

    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}
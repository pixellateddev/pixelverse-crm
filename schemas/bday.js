import sanityClient from 'part:@sanity/base/client'

const slugify = input => input
    .toLowerCase()
    .replace(/\s+/g, '-')
    .slice(0, 200)


const myAsyncSlugifier = (input, type) => {
    const slug = slugify(input)
    const query = 'count(*[_type=="bday" && slug.current == $slug]{_id})'
    const params = {slug: slug}
    return sanityClient.fetch(query, params).then(count => {
      console.log('Movies with identical slug', count)
      return `${slug}-${count + 1}`
    })
}



export const gift = {
    name: 'gift',
    type: 'object',
    fields: [
        {
            name: 'description',
            type: 'string',
            title: 'Description'
        },
        {
            name: 'gift',
            type: 'image'
        }
    ]
}

export default {
    name: 'bday',
    type: 'document',
    title: 'Birthdays',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name'
        },
        {
            name: 'slug',
            type: 'slug',
            options: {
                source: 'name',
                slugify: myAsyncSlugifier
            }
        },
        {
            name: 'image',
            type: 'image',
            title: 'Bday Image'
        },
        {
            name: 'dob',
            type: 'date',
            title: 'Date of Birth',
        },
        {
            name: 'gifts',
            type: 'array',
            of: [{type: 'gift'}]
        }
    ]
}
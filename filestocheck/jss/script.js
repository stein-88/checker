const regCustom = () => {
    Handlebars.registerHelper('loud', (aString) => {
        return aString.toUpperCase()
    })
    Handlebars.registerHelper('downcase', (aString) => {
        return aString.toLowerCase()
    })
    Handlebars.registerHelper('valeu', (aString) => {
        return aString.replace('Careers', 'Obrigado Cristian!')
    })
    return null
}

const buscarDoc = async (url) => {
    if (!url) return null
    let cloneresposta
    try {
        const resposta = await fetch(url, { cache: 'no-store' })
        cloneresposta = await resposta.clone()
        const gojson = await resposta.json()
        return gojson
    } catch (err) {
        if (cloneresposta.status === 404) return null
        if (`${err}`.toLowerCase().includes('unexpected token')) {
            try {
                const gohbs = await cloneresposta.text()
                return gohbs
            } catch (erro) {
                return null
            }
        }
        return null
    }
}

const mastercomp = (schema, templates) => {
    if (!schema || !templates) return null
    const referencia = Object.keys(schema)
    if (!referencia || !referencia.length) return null
    referencia.forEach((ele) => {
        const schemaele = schema[ele]
        const templateele = templates[ele]
        if (!schemaele || !templateele) return null
        const compila = Handlebars.compile(templateele)
        const junta = compila(schemaele)
        $(`#${ele}`).html(junta)
    })
    return null
}

const init = async () => {
    const schema = await buscarDoc('./schema.json')
    const topo = await buscarDoc('./topo.hbs')
    const obj = {
        topo: topo
    }
    mastercomp(schema, obj)
    return null
}

window.onload = () => {
    regCustom()
    init()
}
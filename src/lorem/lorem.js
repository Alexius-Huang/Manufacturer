import LoremWords from './words';
import LoremSentences from './sentences';
import LoremParagraphs from './paragraphs';
import Should from '../helpers/should';

if ( ! String.prototype.chop) {
  String.prototype.chop = function() {
    return this.substring(0, this.length - 1);
  }
}

if ( ! String.prototype.capitalize) {
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
}

if ( ! Array.prototype.sample) {
  Array.prototype.sample = function() {
    const max = this.length - 1;
    const index = Math.floor(Math.random() * max);
    return this[index];
  }
}

/* Lorem Object generate conventional lorem text */
const Lorem = {
  Word(num = 1) {
    new Should(num).Be('Positive', 'Integer');

    let paragraphIndex = 0;
    let wordCount = 0;
    let lorem = '';

    while(wordCount < num) {
      const paragraph = LoremWords[paragraphIndex];

      for (let i = 0; i < paragraph.length && wordCount < num; i++) {
        const token = paragraph[i];
        switch (token.type) {
          case 'word':
            wordCount++;
            lorem += token.content + ' ';
            break;
          case 'period':
            lorem = lorem.chop();
            lorem += '. ';
            break;
          case 'comma':
            lorem = lorem.chop();
            lorem += ', ';
            break;
        }
      }

      lorem = lorem.chop();
      lorem += '\n';

      paragraphIndex++;
      if (paragraphIndex == LoremWords.length) paragraphIndex = 0;
    }

    lorem = lorem.chop();
    lorem += '.';
    return lorem;
  },

  Sentence(num = 1) {
    new Should(num).Be('Positive', 'Integer');

    let paragraphIndex = 0;
    let sentenceCount = 0;
    let lorem = '';

    while (sentenceCount < num) {
      const paragraph = LoremSentences[paragraphIndex];

      for (let i = 0; i < paragraph.length && sentenceCount < num; i++) {
        const token = paragraph[i];
        switch (token.type) {
          case 'sentence':
            sentenceCount++;
            lorem += token.content;
            break;
          case 'period':
            lorem += '. ';
            break;
          case 'comma':
            lorem += ', ';
            break;
        }
      }

      lorem += '\n';

      paragraphIndex++;
      if (paragraphIndex == LoremSentences.length) paragraphIndex = 0;
    }

    lorem = lorem.chop();
    lorem += '.';
    return lorem;
  },

  Paragraph(num = 1) {
    new Should(num).Be('Positive', 'Integer');

    let paragraphIndex = 0;
    let paragraphCount = 0;
    let lorem = '';

    while (paragraphCount < num) {
      const paragraph = LoremParagraphs[paragraphIndex];

      lorem += paragraph + '\n';

      paragraphCount++;
      paragraphIndex++;
      if (paragraphIndex == LoremSentences.length) paragraphIndex = 0;
    }

    lorem = lorem.chop();
    return lorem;
  }
}

Lorem.Random = {
  Word(num = 1) {
    new Should(num).Be('Positive', 'Integer');

    const { Words } = LoremWords;

    const commaProb = 0.1;
    const periodProb = 0.2;

    const firstWord = Words.sample().capitalize();

    let lorem = firstWord + ' ';
    let wordCount = 1;

    while (wordCount < num) {
      const prob = Math.random();

      if (prob < commaProb) {
        lorem = lorem.chop();
        lorem += ', ';
      } else if (prob < periodProb) {
        lorem = lorem.chop();
        lorem += '. ';
      }

      let word = Words.sample();

      if (prob < periodProb && prob >= commaProb) {
        word = word.capitalize();
      } else {
        word = word.toLowerCase();
      }
      wordCount++;

      lorem += word + ' ';
    }

    lorem = lorem.chop() + '.';
    return lorem;
  },

  Sentence(num = 1) {
    new Should(num).Be('Positive', 'Integer');

    const { Sentences } = LoremSentences;
    
    const commaProb = 0.6;

    const firstSentence = Sentences.sample();
    let sentenceCount = 1;
    let lorem = firstSentence.capitalize();

    while (sentenceCount < num) {
      const prob = Math.random();
      let sentence = Sentences.sample();

      if (prob < commaProb) {
        sentence = sentence.toLowerCase();
        lorem += `, ${sentence}`;
      } else {
        sentence = sentence.capitalize();
        lorem += `. ${sentence}`;
      }
      sentenceCount++;
    }

    lorem = lorem.chop() + '.';
    return lorem;
  },

  Paragraph(num = 1) {
    new Should(num).Be('Positive', 'Integer');

    let paragraphCount = 0;
    let lorem = '';

    while (paragraphCount < num) {
      const paragraph = LoremParagraphs.sample();

      lorem += paragraph + '\n';

      paragraphCount++;
    }

    lorem = lorem.chop();
    return lorem;
  }
}

export default Lorem;

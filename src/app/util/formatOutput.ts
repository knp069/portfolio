import {Constants} from '../constants/constants';
import {Home} from '../models/home';
import {Education} from '../models/education';
import {Experience} from '../models/experience';
import {Skills} from '../models/skills';
import {Projects} from '../models/projects';
import {last} from 'rxjs/operators';

export class FormatOutput {

  public static formatOutput(command: string, output: any) {
    switch (command) {
      case Constants.ABOUT_ME :
        return this.formatHomeOutput(output);
      case Constants.EDUCATION :
        return this.formatEducationOutput(output);
      case Constants.EXPERIENCE :
        return this.formatExperienceOutput(output);
      case Constants.SKILLS :
        return this.formatSkillsOutput(output);
      case Constants.PROJECTS :
        return this.formatProjectsOutput(output);
      case Constants.CONTACTS :
        return this.formatContactsOutput(output);
      case Constants.HELP :
        return this.formatHelpOutput();
      case Constants.TIME :
        return this.formatTimeOutput(output);
      case Constants.BANNER :
        return '';
      default :
        return command;

    }
  }

  private static formatHomeOutput(output: Home) {
    let response = '';
    if (output.about.name !== '') {
      response = response.concat('<div class="prompt"> Name  :  <span>' +  output.about.name + '</span></div>');
    }
    if (output.about.phone !== '') {
      response = response.concat('<div class="prompt"> Phone  :  <span>' +  output.about.phone + '</span></div>');
    }
    if (output.about.email !== '') {
      response = response.concat('<div class="prompt"> Email : ' +
        '<a  target="_blank"   href=mailto:' + output.about.email + '> ' + output.about.email + '</a></div>');
    }
    if (output.about.location != null) {
      response = response.concat('<div class="prompt"> <span> Where do i live :  </span>');
      if (output.about.location.address !== '') {
        response = response.concat('<span>' + output.about.location.address + ', </span>');
      }
      if (output.about.location.city !== '') {
        response = response.concat('<span>' + output.about.location.city + ', </span>');
      }
      if (output.about.location.state !== '') {
        response = response.concat('<span>' + output.about.location.state + ' </span></div>');
      }
    }
    response = response.concat('<hr>');
    if (output.about.github !== '') {
      response = response.concat('<div class="prompt"> Github : ' +
        '<a  target="_blank" href=' + output.about.github + '> ' + output.about.github  + '</a></div>');
    }
    if (output.about.linkedin !== '') {
      response = response.concat('<div class="prompt"> LinkedIn : ' +
        '<a  target="_blank" href=' + output.about.linkedin + '> ' + output.about.linkedin  + '</a></div>');
    }
    if (output.about.facebook !== '') {
      response = response.concat('<div class="prompt"> Facebook : ' +
        '<a  target="_blank" href=' + output.about.facebook + '> ' + output.about.facebook  + '</a></div>');
    }
    response = response.concat('<hr>');

    if (output.about.languages !== null) {
      response = response.concat('<div class="prompt"> Languages I know : </div>');
      output.about.languages.forEach( language => {
        response = response.concat('<div class="prompt">' +  language.name + ' : ' + language.proficiency + '</div>');
      });
    }

    if (output.about.interests !== null) {
      response = response.concat('<div class="prompt"> My hobbies include :');
      output.about.interests.forEach( interest => {
        response = response.concat('<span class="prompt badge">' +  interest + ' </span>');
      });
      response = response.concat('</div>');
    }

    response = response.concat('<hr>');

    if (output.about.description !== '') {
      response = response.concat('<div class="prompt"> A little bit about myself : <span>' +  output.about.description + '</span></div>');
    }

    console.log(response);
    return response;
  }

  private static formatEducationOutput(output: Education[]) {
    let response = '';
    output.forEach( education => {
      if (education.institute !== '') {
        response = response.concat('<div class="prompt">  Name : <span> ' + education.institute + '</span></div>');
      }
      if (education.degree !== '') {
      response = response.concat('<div class="prompt">  Degree : <span> ' + education.degree + '</span></div>');
      }
      if (education.major !== '') {
        response = response.concat('<div class="prompt">  Major : <span> ' + education.major + '</span></div>');
      }
      if (education.minor !== '') {
        response = response.concat('<div class="prompt">  Minor : <span> ' + education.minor + '</span></div>');
      }
      response = response.concat('<div class="prompt">  Duration : <span> ' + education.start + ' - ' + education.end + '</span></div>');
      if (education.score !== '') {
      response = response.concat('<div class="prompt">  Score : <span> ' + education.score + '</span></div>');
      }
      response = response.concat('<div class="prompt"><hr></div>');
    });
    console.log(response);
    return response;
  }

  private static formatExperienceOutput(output: Experience[]) {
    let response = '';
    output.forEach( experience => {
      if (experience.company !== '') {
        response = response.concat('<div class="prompt">  Name : <span> ' + experience.company + '</span></div>');
      }
      if (experience.role !== '') {
        response = response.concat('<div class="prompt">  Role : <span> ' + experience.role + '</span></div>');
      }
      response = response.concat('<div class="prompt">  Duration : <span> ' + experience.start + ' - ' + experience.end + '</span></div>');
      if (experience.description.length > 0 ) {
        response = response.concat('<div class="prompt">  Description : <ul>');
        experience.description.forEach( exp => {
          response = response.concat('<li> ' + exp + '</li>');
        });
        response = response.concat('</ul></div>');
      }
      response = response.concat('<div class="prompt"><hr></div>');
    });
    console.log(response);
    return response;
  }

  private static formatSkillsOutput(output: Skills) {
    let response = '';
    response = response.concat('<div class="skills-wrapper">');
    if (output.programming.languages.length > 0) {
      response = response.concat('<div>');
      response = response.concat('<div class="heading"><samp>Languages</samp></div>');
      response = response.concat('<table class="table"><tbody>');
      output.programming.languages.forEach( language => {
        response = response.concat('<tr>');
        response = response.concat('<td>' + language.name + '</td>');
        response = response.concat('<td>' + '* '.repeat(language.level) + '</td>');
        response = response.concat('</tr>');
      });
      response = response.concat('</tbody></table>');
      response = response.concat('</div>');
    }
    if (output.programming.frameworks.length > 0) {
      response = response.concat('<div>');
      response = response.concat('<div class="heading"><samp>Frameworks</samp></div>');
      response = response.concat('<table class="table"><tbody>');
      output.programming.frameworks.forEach( framework => {
        response = response.concat('<tr>');
        response = response.concat('<td>' + framework.name + '</td>');
        response = response.concat('<td>' + '* '.repeat(framework.level) + '</td>');
        response = response.concat('</tr>');
      });
      response = response.concat('</tbody></table>');
      response = response.concat('</div>');
    }
    response = response.concat('</div>');
    console.log(response);
    return response;
  }

  private static formatProjectsOutput(output: Projects[]) {
    let response = '';
    output.forEach( project => {
      if (project.name !== '') {
        response = response.concat('<div class="prompt">  Name : <span> ' + project.name + '</span></div>');
      }
      if (project.url !== '') {
        response = response.concat('<div class="prompt">  URL : <a  target="_blank" href=' + project.url + '> ' + project.url + '</a></div>');
      }
      if (project.description !== '') {
        response = response.concat('<div class="prompt">  Description : <span> ' + project.description + '</span></div>');
      }
      if (project.tags.length > 0) {
        response = response.concat('<div class="prompt"> Technology : ');
        project.tags.forEach( tag => {
          response = response.concat('<span>' + tag + ',&nbsp;' + '</span>');
        });
        response = response.concat('</div>');
        response = response.concat('<div class="prompt"></div>');
      }

      if (project.contributors.length > 0) {
        response = response.concat('<div class="prompt"> Contributors : ');
        project.contributors.forEach( contributor => {
          response = response.concat('<span>' + contributor + ',&nbsp;' + '</span>');
        });
        response = response.concat('</div>');
        response = response.concat('<div class="prompt"><hr></div>');
      }
    });
    console.log(response);
    return response;
  }

  private static formatContactsOutput(output: Home) {
    let response = '';
    if (output.about.phone !== '') {
      response = response.concat('<span class="prompt"> You can ping me at ' + output.about.phone + ' or </span>');
    }
    if (output.about.email !== '') {
      response = response.concat('<span class="prompt"> can drop me an e-mail at <a href=mailto:' + output.about.email + '>' + output.about.email + '</a></span>');
    }
    console.log(response);
    return response;
  }

  private static formatHelpOutput() {
    return 'help';
  }

  private static formatTimeOutput(output: any) {
    return output.toString();
  }
}

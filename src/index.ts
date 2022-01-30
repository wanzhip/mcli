#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const program = require('commander');
const readline = require('readline');
const shell = require('shelljs');


// type choices = number | string | {name: string, value: string | number | boolean, short?: string} | Function;

// 即用户新输入的参数值和当前已有的参数值
const optionFunc = (newVal, preValue) => {
    console.log(newVal, preValue);
}

program
    .configureOutput({
        // 此处使输出变得容易区分
        writeOut: (str) => process.stdout.write(`[OUT] ${str}`),
        writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
        // 将错误高亮显示
        outputError: (str, write) => write(chalk.hex('#f40')(str))
    })
    .command('create <name>')
    .description('创建应用')
    .option('-f,--force <path>', '是否强制创建', optionFunc)
    .action((name, options, command) => {
        console.log(name, 'xx')
        if (!name) {
            console.log(chalk.hex('#f40')('请输入项目名'))
            return;
        } else {
            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'update',
                    message: `Your connection to the default yarn registry seems to be slow.\n Use https://registry.npm.taobao.org for faster installation?`,
                    default: true,
                },
                {
                    when: (answer) => {
                        if (!answer.update) {
                            console.log(chalk.hex('#f40')('开始更新...'));
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'preset',
                    message: 'Please pick a preset:',
                    choices: [
                        {
                            name: 'Default ([Vue 2] babel, eslint)',
                            value: '1',
                        },
                        {
                            name: 'Default (Vue 3) ([Vue 3] babel, eslint)',
                            value: '2',
                        },
                        {
                            name: 'Manually select features',
                            value: '3',
                        },
                    ],
                    when: (answer) => {
                        if (answer.update) {
                            console.log(chalk.red(`\n\nVue CLI v4.5.13`));
                            console.log(`
┌───────────────────────────────────────────┐
│                                           │
│   New version available ${chalk.hex('#f40')('4.5.13')} → ${chalk.hex('#f40')('4.5.15')}   │
│     Run ${chalk.hex('#f40')('npm i -g @vue/cli')} to update!      │
│                                           │
└───────────────────────────────────────────┘
                        `);
                        }
                        return answer.update;
                    }
                },
                {
                    type: 'list',
                    name: 'type',
                    message: 'Pick the package manager to use when installing dependencies:',
                    choices: [
                        {
                            name: 'Use Yarn',
                            value: 'yarn',
                        },
                        {
                            name: 'Use NPM',
                            value: 'npm',
                        },
                    ],
                    when: (answer) => {
                        return answer.update
                    }
                },
                {
                    when: (answer) => {
                        if (answer.type) {
                            console.log(chalk.hex('#f40')('Vue CLI v4.5.13'));
                            console.log(chalk.hex('#f40')('✨  Creating project in /Users/zhiepngwan/Desktop/demo/1111.'));
                            console.log(chalk.hex('#f40')('🗃  Initializing git repository...'));
                            console.log(chalk.hex('#f40')('⚙️  Installing CLI plugins. This might take a while...'));
                        }
                    }
                },
                {
                    type: 'confirm',
                    name: 'join',
                    message: '加入我',
                    default: true,
                    when: (answer) => {
                        return answer.update
                    }
                },
                {
                    when: (answer) => {
                        if (!answer.join) {
                            const outStream = process.stdout;

                            // 创建interface
                            const rl = readline.createInterface({
                                input: process.stdin,
                                output: outStream
                            });

                            const textArr = ['2021', '辞旧', '2022', '迎新', '新的一年', '加油写作', 'Fight', 'Together！'];

                            // 随机坐标
                            const randomPos = () => {
                                const x = Math.floor(30 * Math.random());
                                const y = Math.floor(10 * Math.random());
                                return [x, y];
                            }
                            // chalk 上色
                            const randomTextStyle = (text) => {
                                const styles = ['redBright', 'yellowBright', 'blueBright', 'cyanBright', 'greenBright', 'magentaBright', 'whiteBright'];
                                const color = styles[Math.floor(Math.random() * styles.length)];
                                return chalk[color](text);
                            }
                            // 延时
                            const delay = (time) => {
                                return new Promise((resolve) => setTimeout(resolve, time));
                            }
                            setTimeout(async () => {
                                for (let i = 0; i < textArr.length; i++) {
                                    readline.cursorTo(outStream, ...randomPos());
                                    rl.write(randomTextStyle(textArr[i])); // 展示到控制台

                                    await delay(1000);
                                    readline.cursorTo(outStream, 0, 0);
                                    readline.clearScreenDown(outStream);
                                }
                            }, 1000);
                        }
                    }
                }
            ])
                .then((answer) => {
                    if (!answer.join) {
                        readline.cursorTo(process.stdout, 0, 0); // 移动光标 你就理解成改变控制台位置到 0，0
                        readline.clearScreenDown(process.stdout); // 清屏操作 就像使用vue-cli看到的一样
                        return;
                    }
                    console.log(answer);
                    console.log('etx... 接着再执行一系列命令');

                    // 执行命令
                    // if (shell.exec('yarn add jQuery').code !== 0) {
                    //     shell.echo('Error: install failed');
                    //     shell.exit(1);
                    // }
                    // if (shell.exec('git clone https://github.com/wanzhip/mcli.git').code !== 0) {
                    //     shell.echo('Error: install failed');
                    //     shell.exit(1);
                    // }
                });
        };
    });

program.parse(process.argv);

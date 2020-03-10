import Bee from 'bee-queue';
import RegistrationMail from '@jobs/RegistrationMail';
import ForgetPasswordMail from '@jobs/ForgetPasswordMail';
import redisConfig from '@config/redis';

const jobs = [RegistrationMail, ForgetPasswordMail];
class Queue {
  private queues: any;

  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue: string, job: any) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job: any, err: any) {
    console.error(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();

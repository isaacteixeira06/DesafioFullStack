module Api
  module V1
    class CoursesController < ApplicationController
      def index
        courses = Course.search_by_name(params[:search])
                        .includes(:creator)
                        .order(created_at: :desc)

        render json: courses.as_json(
          only: [:id, :name, :description, :start_date, :end_date],
          include: { creator: { only: [:id, :name] } }
        )
      end

      def show
        course = Course.includes(:creator, :lessons).find(params[:id])

        render json: course.as_json(
          only: [:id, :name, :description, :start_date, :end_date],
          include: {
            creator: { only: [:id, :name] },
            lessons: { only: [:id, :title, :status, :video_url] }
          }
        )
      end

      def create
        course = Courses::CreateCourse.new(course_params, current_user).call
        render json: course.as_json(
          only: [:id, :name, :description, :start_date, :end_date],
          include: { creator: { only: [:id, :name] } }
        ), status: :created
      end

      def update
        course = Course.find(params[:id])
        updated = Courses::UpdateCourse.new(course, course_params, current_user).call
        render json: updated.as_json(
          only: [:id, :name, :description, :start_date, :end_date],
          include: { creator: { only: [:id, :name] } }
        )
      end

      def destroy
        course = Course.find(params[:id])
        Courses::DeleteCourse.new(course, current_user).call
        head :no_content
      end

      private

      def course_params
        params.require(:course).permit(:name, :description, :start_date, :end_date)
      end
    end
  end
end